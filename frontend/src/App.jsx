import { useState, useEffect } from 'react'
import { getCities, getForecast } from './api/weather'
import CitySelector    from './components/CitySelector'
import ForecastCard    from './components/ForecastCard'
import HistoricalChart from './components/HistoricalChart'
import LoadingSpinner  from './components/LoadingSpinner'
import CityMap         from './components/CityMap'
import ThermometerGauge from './components/ThermometerGauge'
import { CITIES_META }  from './data/cities'

export default function App() {
  const [cities,  setCities]  = useState([])
  const [city,    setCity]    = useState('')
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    getCities().then(r => setCities(r.data.cities)).catch(() => {})
  }, [])

  const handleCityChange = async (selected) => {
    if (!selected) return
    setCity(selected)
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const res = await getForecast(selected)
      setData(res.data)
    } catch (e) {
      setError(e.response?.data?.detail || 'Failed to load forecast.')
    }
    setLoading(false)
  }

  const todayMax = data?.forecast?.[0]?.max_temp
  const todayMin = data?.forecast?.[0]?.min_temp
  const cityMeta = city ? CITIES_META[city] : null

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>

      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: '40px 24px 60px',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,179,237,0.08) 0%, transparent 40%)',
          pointerEvents: 'none'
        }}/>
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22
            }}>
              🌤
            </div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
                India Weather Forecast
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
                7-day LSTM deep learning forecast for 20 Indian cities
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '-28px auto 0', padding: '0 24px 48px', position: 'relative' }}>

        <div style={{
          background: '#fff', borderRadius: 16, padding: '20px 24px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <CitySelector cities={cities} value={city} onChange={handleCityChange} />
          </div>
          {city && cityMeta && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{
                background: '#f0f7ff', color: '#2563eb', fontSize: 12,
                padding: '4px 12px', borderRadius: 20, fontWeight: 500
              }}>
                {cityMeta.state}
              </span>
              <span style={{
                background: '#f0fdf4', color: '#16a34a', fontSize: 12,
                padding: '4px 12px', borderRadius: 20, fontWeight: 500
              }}>
                {cityMeta.region}
              </span>
            </div>
          )}
        </div>

        {loading && <LoadingSpinner city={city} />}

        {error && (
          <div style={{
            padding: '14px 18px', background: '#fff5f5',
            border: '1px solid #feb2b2', borderRadius: 12,
            color: '#c53030', fontSize: 14, marginBottom: 24
          }}>
            {error}
          </div>
        )}

        {data && !loading && (
          <div className="fade-in">

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
              <CityMap city={city} cityMeta={cityMeta} />
              <ThermometerGauge
                maxTemp={todayMax}
                minTemp={todayMin}
                city={city}
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <h2 style={{ fontSize: 17, fontWeight: 600, color: '#1a1a2e' }}>
                7-day forecast
              </h2>
              <p style={{ fontSize: 12, color: '#999', marginTop: 2 }}>
                {data.forecast[0]?.date} — {data.forecast[6]?.date}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 10, marginBottom: 24
            }}>
              {data.forecast.map((day, i) => (
                <ForecastCard key={day.date} day={day} index={i} />
              ))}
            </div>

            <HistoricalChart
              data={data.historical}
              forecast={data.forecast}
              city={city}
            />
          </div>
        )}

        {!data && !loading && !error && (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#fff', borderRadius: 16,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <div style={{ fontSize: 56, marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>
              🌏
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a2e', marginBottom: 8 }}>
              Select a city to get started
            </h3>
            <p style={{ color: '#999', fontSize: 14 }}>
              Choose any of 20 Indian cities to see the 7-day LSTM forecast
            </p>
          </div>
        )}
      </div>
    </div>
  )
}