'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Henry Learning OS] Unhandled error:', error);
  }, [error]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
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
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😅</div>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#92400e',
            marginBottom: '0.75rem',
          }}
        >
          Ôi! Có lỗi xảy ra rồi
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: '#78716c',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          Đừng lo nhé — nhấn nút bên dưới để thử lại.
          Nếu lỗi vẫn tiếp tục, hãy tải lại trang.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{
              padding: '0.875rem 2rem',
              borderRadius: '1rem',
              border: 'none',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'transform 0.15s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            🔄 Thử lại
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.875rem 2rem',
              borderRadius: '1rem',
              border: '2px solid #d6d3d1',
              background: 'white',
              color: '#57534e',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'transform 0.15s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            ↻ Tải lại trang
          </button>
        </div>
      </div>
    </div>
  );
}
