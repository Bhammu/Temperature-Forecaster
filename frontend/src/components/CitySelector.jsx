export default function CitySelector({ cities, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <label style={{
        fontSize: 14, color: '#555', fontWeight: 600,
        whiteSpace: 'nowrap'
      }}>
        Select City:
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: '10px 16px', fontSize: 15, borderRadius: 10,
          border: '1.5px solid #e2e8f0', minWidth: 220,
          cursor: 'pointer', background: '#f8fafc',
          outline: 'none', color: '#1a1a2e', fontWeight: 500,
          transition: 'border-color 0.2s',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: 36
        }}
      >
        <option value="">-- Choose a city --</option>
        {cities.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  )
}