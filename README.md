# India Weather Forecast — LSTM Deep Learning

7-day temperature forecast for 20 Indian cities using stacked LSTM neural networks + FastAPI + React.

## Tech stack
- ML: TensorFlow / Keras, scikit-learn, pandas, numpy
- Backend: FastAPI + uvicorn
- Frontend: React + Recharts + Vite
- Data: Open-Meteo free API (no key needed)

## Folder structure
```
india-weather-forecast/
├── ml/          → training + prediction scripts
├── backend/     → FastAPI REST API
├── frontend/    → React UI
└── models/      → trained .keras models (one folder per city)
```

## Setup

### Step 1 — Train models (Google Colab, run once)
Open the Colab training notebook, enable GPU, run all cells.
Download `india_weather_models.zip` and unzip into `models/`.

### Step 2 — Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Step 3 — Frontend
```bash
cd frontend
npm install
cp ../.env.example .env
npm run dev
```

Open http://localhost:5173

## Cities supported
Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune,
Ahmedabad, Jaipur, Lucknow, Surat, Kanpur, Nagpur, Indore,
Bhopal, Patna, Vadodara, Coimbatore, Agra, Visakhapatnam

## Deploy
- Frontend → Vercel
- Backend  → Railway or Render
