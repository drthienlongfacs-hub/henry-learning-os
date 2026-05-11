'use client';

import { useEffect } from 'react';

export default function ChildError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Child Section] Error:', error);
  }, [error]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)',
        fontFamily: 'Nunito, Inter, sans-serif',
      }}
    >
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="text-5xl mb-4">🤖</div>
        <h2 className="text-xl font-bold text-blue-900 mb-3">Ối! Bài học bị lỗi rồi</h2>
        <p className="text-stone-500 mb-6 leading-relaxed">
          Robot học tập gặp trục trặc nhỏ. Nhấn &quot;Thử lại&quot; để tiếp tục học nhé!
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-base hover:scale-105 transition-transform border-none cursor-pointer"
          >
            🔄 Thử lại
          </button>
          <a
            href="/child/"
            className="px-6 py-3 rounded-xl border-2 border-stone-200 bg-white text-stone-600 font-semibold text-base hover:scale-105 transition-transform no-underline"
          >
            🏠 Về trang chính
          </a>
        </div>
      </div>
    </div>
  );
}
