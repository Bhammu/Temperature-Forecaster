export default function ThermometerGauge({ maxTemp, minTemp, city }) {
  const absMin  = 0
  const absMax  = 50
  const range   = absMax - absMin

  const maxPct  = Math.min(100, Math.max(0, ((maxTemp - absMin) / range) * 100))
  const minPct  = Math.min(100, Math.max(0, ((minTemp - absMin) / range) * 100))
  const avgTemp = ((maxTemp + minTemp) / 2).toFixed(1)

  const getColor = (temp) => {
    if (temp >= 40) return '#ef4444'
    if (temp >= 35) return '#f97316'
    if (temp >= 28) return '#f59e0b'
    if (temp >= 20) return '#22c55e'
    if (temp >= 12) return '#3b82f6'
    return '#6366f1'
  }

  const maxColor = getColor(maxTemp)
  const minColor = getColor(minTemp)

  const tempLabel = (temp) => {
    if (temp >= 40) return 'Extreme heat'
    if (temp >= 35) return 'Very hot'
    if (temp >= 28) return 'Hot'
    if (temp >= 20) return 'Warm'
    if (temp >= 12) return 'Cool'
    return 'Cold'
  }

  return (
    <div style={{
      background: '#fff', borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      padding: '20px 24px'
    }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e', marginBottom: 4 }}>
        🌡️ Temperature gauge — tomorrow
      </div>
      <div style={{ fontSize: 12, color: '#999', marginBottom: 20 }}>
        {city} · forecast day 1
      </div>

      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', justifyContent: 'center', marginBottom: 20 }}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 12, color: '#999', fontWeight: 500 }}>MIN</div>
          <div style={{ position: 'relative', width: 32, height: 160 }}>
            <div style={{
              position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
              width: 16, height: 160, background: '#f1f5f9',
              borderRadius: 8, overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', bottom: 0, width: '100%',
                height: `${minPct}%`,
                background: `linear-gradient(to top, ${minColor}, ${minColor}88)`,
                borderRadius: 8,
                transition: 'height 1s ease'
              }}/>
            </div>
            <div style={{
              position: 'absolute', bottom: -8, left: '50%',
              transform: 'translateX(-50%)',
              width: 24, height: 24, borderRadius: '50%',
              background: minColor,
              boxShadow: `0 0 10px ${minColor}66`
            }}/>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: minColor }}>
            {minTemp}°
          </div>
          <div style={{ fontSize: 11, color: '#aaa' }}>{tempLabel(minTemp)}</div>
        </div>

        <div style={{ textAlign: 'center', paddingBottom: 50 }}>
          <div style={{ fontSize: 13, color: '#999', marginBottom: 4 }}>AVG</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: getColor(parseFloat(avgTemp)) }}>
            {avgTemp}°
          </div>
          <div style={{ fontSize: 12, color: '#bbb', marginTop: 4 }}>
            {tempLabel(parseFloat(avgTemp))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 12, color: '#999', fontWeight: 500 }}>MAX</div>
          <div style={{ position: 'relative', width: 32, height: 160 }}>
            <div style={{
              position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
              width: 16, height: 160, background: '#f1f5f9',
              borderRadius: 8, overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', bottom: 0, width: '100%',
                height: `${maxPct}%`,
                background: `linear-gradient(to top, ${maxColor}, ${maxColor}88)`,
                borderRadius: 8,
                transition: 'height 1s ease'
              }}/>
            </div>
            <div style={{
              position: 'absolute', bottom: -8, left: '50%',
              transform: 'translateX(-50%)',
              width: 24, height: 24, borderRadius: '50%',
              background: maxColor,
              boxShadow: `0 0 10px ${maxColor}66`
            }}/>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: maxColor }}>
            {maxTemp}°
          </div>
          <div style={{ fontSize: 11, color: '#aaa' }}>{tempLabel(maxTemp)}</div>
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11, color: '#bbb', borderTop: '1px solid #f0f0f0',
        paddingTop: 12, marginTop: 4
      }}>
        {[0, 10, 20, 30, 40, 50].map(t => (
          <span key={t}>{t}°</span>
        ))}
      </div>
      <div style={{
        height: 4, background: 'linear-gradient(to right, #6366f1, #3b82f6, #22c55e, #f59e0b, #f97316, #ef4444)',
        borderRadius: 2, marginTop: 4
      }}/>
    </div>
  )
}