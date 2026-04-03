import sys
sys.path.append("../ml")

from fastapi import APIRouter, HTTPException
from predict import get_forecast
from cities import CITIES

router = APIRouter(prefix="/api")

@router.get("/forecast")
def forecast(city: str):
    city_input = city.strip().lower()

    # find matching key safely
    matched_key = None
    for key in CITIES:
        if key.lower() == city_input:
            matched_key = key
            break

    if not matched_key:
        raise HTTPException(
            status_code=400,
            detail=f"City '{city}' not supported. Available: {list(CITIES.keys())[:5]}"
        )

    coords = CITIES[matched_key]

    try:
        slug = matched_key.lower().replace(" ", "_")
        return get_forecast(slug, coords['lat'], coords['lon'])

    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail=f"Model for {matched_key} not found"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))