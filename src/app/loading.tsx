export default function RootLoading() {
  return (
    <div
      role="status"
      aria-label="Đang tải..."
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        fontFamily: 'Nunito, Inter, sans-serif',
        gap: '1.5rem',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          border: '4px solid #fde68a',
          borderTopColor: '#f59e0b',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p
        style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: '#92400e',
          letterSpacing: '0.025em',
        }}
      >
        Đang chuẩn bị bài học...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
