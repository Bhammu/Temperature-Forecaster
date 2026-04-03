export default function CityMap({ city, cityMeta }) {
  if (!cityMeta) return null

  const { lat, lon, state, region } = cityMeta

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 1},${lat - 1},${lon + 1},${lat + 1}&layer=mapnik&marker=${lat},${lon}`

  return (
    <div style={{
      background: '#fff', borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>
          📍 {city}
        </div>
        <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>
          {state} · {region} · {lat.toFixed(2)}°N {lon.toFixed(2)}°E
        </div>
      </div>
      <iframe
        title={`Map of ${city}`}
        src={mapUrl}
        width="100%"
        height="220"
        style={{ border: 'none', display: 'block' }}
        loading="lazy"
      />
    </div>
  )
}