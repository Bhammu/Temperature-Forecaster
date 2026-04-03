import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  Legend, ResponsiveContainer, CartesianGrid, ReferenceLine
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0',
      borderRadius: 10, padding: '10px 14px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 13
    }}>
      <div style={{ fontWeight: 600, color: '#1a1a2e', marginBottom: 6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{p.value}°C</strong>
        </div>
      ))}
    </div>
  )
}

export default function HistoricalChart({ data, forecast, city }) {
  const historical = data.map(d => ({
    date:     typeof d.date === 'string' ? d.date.slice(0, 10) : String(d.date).slice(0, 10),
    max_temp: d.max_temp,
    min_temp: d.min_temp,
  }))

  const forecastPoints = forecast.map(d => ({
    date:  d.date,
    f_max: d.max_temp,
    f_min: d.min_temp,
  }))

  const combined    = [...historical, ...forecastPoints]
  const splitDate   = forecastPoints[0]?.date

  return (
    <div style={{
      background: '#fff', borderRadius: 16,
      border: '1px solid #f0f0f0', padding: '20px 20px 16px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
    }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a2e' }}>
          Historical + forecast — {city}
        </h3>
        <p style={{ fontSize: 12, color: '#999', marginTop: 2 }}>
          Last 60 days of actual data + 7-day prediction
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={combined} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f8f8f8" />
          <XAxis
            dataKey="date" tick={{ fontSize: 10, fill: '#aaa' }}
            interval={8} axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#aaa' }} unit="°"
            axisLine={false} tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          />
          {splitDate && (
            <ReferenceLine
              x={splitDate} stroke="#cbd5e1"
              strokeDasharray="4 3"
              label={{ value: '▶ Forecast', fontSize: 10, fill: '#94a3b8', position: 'top' }}
            />
          )}
          <Line
            dataKey="max_temp" stroke="#e05a2b" dot={false}
            name="Max (actual)" strokeWidth={2}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            dataKey="min_temp" stroke="#3a7bd5" dot={false}
            name="Min (actual)" strokeWidth={2}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            dataKey="f_max" stroke="#e05a2b" dot={{ r: 4, fill: '#e05a2b' }}
            name="Max (forecast)" strokeWidth={2.5}
            strokeDasharray="5 3"
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            dataKey="f_min" stroke="#3a7bd5" dot={{ r: 4, fill: '#3a7bd5' }}
            name="Min (forecast)" strokeWidth={2.5}
            strokeDasharray="5 3"
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}