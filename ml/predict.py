import pickle
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model

WINDOW = 90
FUTURE = 7
FEATURE_COLS = [
    'min_temp', 'max_temp', 'avg_temp',
    'humidity', 'wind_speed', 'precipitation', 'cloud_cover',
    'day_of_year_sin', 'day_of_year_cos',
    'wind_dir_sin', 'wind_dir_cos',
    'min_temp_lag1', 'max_temp_lag1',
    'min_temp_lag7', 'max_temp_lag7',
    'humidity_lag1', 'wind_speed_lag1', 'precip_lag1',
    'temp_volatility', 'temp_range',
    'precip_7day_sum', 'humidity_7day_avg'
]

def fetch_recent_data(lat, lon):
    url = (
        f"https://archive-api.open-meteo.com/v1/archive"
        f"?latitude={lat}&longitude={lon}"
        f"&start_date={(pd.Timestamp.today() - pd.Timedelta(days=130)).strftime('%Y-%m-%d')}"
        f"&end_date={pd.Timestamp.today().strftime('%Y-%m-%d')}"
        f"&daily=temperature_2m_max,temperature_2m_min,"
        f"precipitation_sum,wind_speed_10m_max,"
        f"cloud_cover_mean,relative_humidity_2m_mean,"
        f"wind_direction_10m_dominant"
        f"&timezone=auto&format=csv"
    )
    df = pd.read_csv(url, skiprows=3)
    df.columns = ['date', 'max_temp', 'min_temp', 'precipitation',
                  'wind_speed', 'cloud_cover', 'humidity', 'wind_direction']
    df = df.dropna().reset_index(drop=True)
    df['date'] = pd.to_datetime(df['date'])
    return df

def engineer_features(df):
    df = df.copy()
    df['avg_temp']          = (df['max_temp'] + df['min_temp']) / 2
    df['day_of_year_sin']   = np.sin(2 * np.pi * df['date'].dt.dayofyear / 365)
    df['day_of_year_cos']   = np.cos(2 * np.pi * df['date'].dt.dayofyear / 365)
    df['wind_dir_sin']      = np.sin(2 * np.pi * df['wind_direction'] / 360)
    df['wind_dir_cos']      = np.cos(2 * np.pi * df['wind_direction'] / 360)
    df['min_temp_lag1']     = df['min_temp'].shift(1)
    df['max_temp_lag1']     = df['max_temp'].shift(1)
    df['min_temp_lag7']     = df['min_temp'].shift(7)
    df['max_temp_lag7']     = df['max_temp'].shift(7)
    df['humidity_lag1']     = df['humidity'].shift(1)
    df['wind_speed_lag1']   = df['wind_speed'].shift(1)
    df['precip_lag1']       = df['precipitation'].shift(1)
    df['temp_volatility']   = df['avg_temp'].rolling(7).std()
    df['temp_range']        = df['max_temp'] - df['min_temp']
    df['precip_7day_sum']   = df['precipitation'].rolling(7).sum()
    df['humidity_7day_avg'] = df['humidity'].rolling(7).mean()
    return df.dropna().reset_index(drop=True)

def get_forecast(city_slug: str, lat: float, lon: float):
    path        = f"../models/{city_slug}"
    model       = load_model(f"{path}/model.keras")
    with open(f"{path}/scaler.pkl", 'rb') as f:
        scalers = pickle.load(f)
    scaler      = scalers['scaler']
    temp_scaler = scalers['temp_scaler']

    df          = fetch_recent_data(lat, lon)
    df          = engineer_features(df)

    features    = df[FEATURE_COLS].values
    scaled      = scaler.transform(features)
    last_window = scaled[-WINDOW:].reshape(1, WINDOW, len(FEATURE_COLS))

    pred_scaled = model.predict(last_window, verbose=0).reshape(FUTURE, 3)
    pred_actual = temp_scaler.inverse_transform(pred_scaled)

    today        = pd.Timestamp.today()
    future_dates = pd.date_range(
        start=today + pd.Timedelta(days=1), periods=FUTURE
    )

    historical = df[['date', 'min_temp', 'max_temp',
                      'avg_temp', 'humidity',
                      'wind_speed', 'precipitation']].tail(60)

    return {
        "city": city_slug,
        "forecast": [
            {
                "date":     d.strftime('%d %b %Y'),
                "min_temp": round(float(pred_actual[i, 0]), 1),
                "max_temp": round(float(pred_actual[i, 1]), 1),
                "avg_temp": round(float(pred_actual[i, 2]), 1),
            }
            for i, d in enumerate(future_dates)
        ],
        "historical": historical.to_dict(orient='records')
    }