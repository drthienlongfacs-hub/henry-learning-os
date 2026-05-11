export default function ChildLoading() {
  return (
    <div
      role="status"
      aria-label="Đang tải bài học..."
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{
        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        fontFamily: 'Nunito, Inter, sans-serif',
      }}
    >
      <div className="relative w-16 h-16">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '4px solid #bfdbfe',
            borderTopColor: '#3b82f6',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">📚</div>
      </div>
      <p className="text-lg font-semibold text-blue-900 tracking-wide">
        Đang chuẩn bị bài học...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
