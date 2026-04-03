export default function LoadingSpinner() {
  return (
    <div style={{
      textAlign: 'center', padding: '3rem',
      color: '#888', fontSize: 15
    }}>
      <div style={{
        width: 36, height: 36, border: '3px solid #eee',
        borderTop: '3px solid #3a7bd5', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        margin: '0 auto 12px'
      }} />
      Loading forecast for your city...
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
