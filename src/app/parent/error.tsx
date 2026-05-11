'use client';

import { useEffect } from 'react';

export default function ParentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Parent Section] Error:', error);
  }, [error]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
        <div className="text-4xl mb-4 text-center">⚠️</div>
        <h2 className="text-xl font-bold text-emerald-900 mb-2 text-center">Đã xảy ra lỗi</h2>
        <p className="text-stone-500 mb-4 text-center leading-relaxed">
          Mục này gặp sự cố kỹ thuật. Vui lòng thử lại hoặc quay về trang quản lý.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-4 p-3 bg-red-50 rounded-lg text-xs text-red-800">
            <summary className="cursor-pointer font-semibold">Chi tiết lỗi (dev only)</summary>
            <pre className="mt-2 whitespace-pre-wrap break-all">{error.message}</pre>
          </details>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors border-none cursor-pointer"
          >
            Thử lại
          </button>
          <a
            href="/parent/dashboard/"
            className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-600 font-semibold hover:bg-stone-50 transition-colors no-underline"
          >
            Về Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
