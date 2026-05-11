import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)',
        fontFamily: 'Nunito, Inter, sans-serif',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '1.5rem',
          padding: '3rem',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗺️</div>
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#5b21b6',
            marginBottom: '0.75rem',
          }}
        >
          Trang không tìm thấy
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: '#78716c',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          Oops! Trang này không tồn tại hoặc đã được di chuyển.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.875rem 2rem',
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            transition: 'transform 0.15s',
          }}
        >
          🏠 Về trang chủ
        </Link>
      </div>
    </div>
  );
}
