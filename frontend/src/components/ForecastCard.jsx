const WEATHER_ICONS = {
  sunny:  { icon: '☀️', bg: '#fffbeb', border: '#fcd34d', label: 'Sunny' },
  cloudy: { icon: '⛅', bg: '#f8fafc', border: '#cbd5e1', label: 'Cloudy' },
  rainy:  { icon: '🌧️', bg: '#eff6ff', border: '#93c5fd', label: 'Rainy'  },
  hot:    { icon: '🌡️', bg: '#fff5f5', border: '#fc8181', label: 'Hot'    },
  cool:   { icon: '🌬️', bg: '#f0fdf4', border: '#86efac', label: 'Cool'   },
}

function getWeatherType(max, min) {
  const avg = (max + min) / 2
  if (max >= 38)        return 'hot'
  if (avg <= 18)        return 'cool'
  if (max - min >= 14)  return 'sunny'
  if (avg >= 25)        return 'sunny'
  return 'cloudy'
}

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export default function ForecastCard({ day, index }) {
  const type    = getWeatherType(day.max_temp, day.min_temp)
  const weather = WEATHER_ICONS[type]
  const dateObj = new Date(day.date)
  const dayName = DAYS[dateObj.getDay()] || `Day ${index + 1}`
  const isToday = index === 0

  return (
    <div style={{
      background: isToday ? 'linear-gradient(135deg, #1a1a2e, #0f3460)' : '#fff',
      border: `1.5px solid ${isToday ? 'transparent' : weather.border}`,
      borderRadius: 16, padding: '16px 10px',
      textAlign: 'center',
      boxShadow: isToday
        ? '0 8px 24px rgba(15,52,96,0.3)'
        : '0 2px 8px rgba(0,0,0,0.06)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
      animation: `fadeIn 0.4s ease ${index * 0.06}s both`
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = isToday
        ? '0 12px 32px rgba(15,52,96,0.4)'
        : '0 8px 20px rgba(0,0,0,0.1)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = isToday
        ? '0 8px 24px rgba(15,52,96,0.3)'
        : '0 2px 8px rgba(0,0,0,0.06)'
    }}
    >
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
        color: isToday ? 'rgba(255,255,255,0.6)' : '#999',
        marginBottom: 6, textTransform: 'uppercase'
      }}>
        {isToday ? 'TODAY' : dayName}
      </div>

      <div style={{
        fontSize: 30, marginBottom: 8,
        animation: 'float 3s ease-in-out infinite',
        animationDelay: `${index * 0.3}s`
      }}>
        {weather.icon}
      </div>

      <div style={{
        fontSize: 11, color: isToday ? 'rgba(255,255,255,0.5)' : '#aaa',
        marginBottom: 10
      }}>
        {weather.label}
      </div>

      <div style={{
        fontSize: 24, fontWeight: 700,
        color: isToday ? '#fff' : '#e05a2b'
      }}>
        {day.max_temp}°
      </div>

      <div style={{
        fontSize: 14, fontWeight: 500,
        color: isToday ? 'rgba(255,255,255,0.6)' : '#3a7bd5',
        marginTop: 2
      }}>
        {day.min_temp}°
      </div>

      <div style={{
        fontSize: 10, marginTop: 8, paddingTop: 8,
        borderTop: `1px solid ${isToday ? 'rgba(255,255,255,0.1)' : '#f0f0f0'}`,
        color: isToday ? 'rgba(255,255,255,0.4)' : '#bbb'
      }}>
        avg {day.avg_temp}°
      </div>
    </div>
  )
}