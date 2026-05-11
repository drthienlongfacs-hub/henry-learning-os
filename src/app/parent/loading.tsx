export default function ParentLoading() {
  return (
    <div
      role="status"
      aria-label="Đang tải..."
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        className="w-12 h-12 rounded-full"
        style={{
          border: '3px solid #bbf7d0',
          borderTopColor: '#16a34a',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p className="text-base font-medium text-emerald-800">Đang tải dữ liệu...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
