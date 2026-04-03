from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import forecast, cities

app = FastAPI(title="India Weather Forecast API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(forecast.router)
app.include_router(cities.router)

@app.get("/")
def root():
    return {"status": "ok", "message": "India Weather Forecast API"}