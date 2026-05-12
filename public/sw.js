// ========================================
// Henry Learning OS — Service Worker
// Offline-first: cache app shell + static assets
// Strategy: Cache-first for assets, Network-first for pages
// ========================================

const CACHE_NAME = 'henry-os-v3';
const STATIC_ASSETS = [
  '/henry-learning-os/',
  '/henry-learning-os/child/',
  '/henry-learning-os/parent/dashboard/',
  '/henry-learning-os/manifest.json',
  '/henry-learning-os/icons/icon-192.png',
  '/henry-learning-os/icons/icon-512.png',
];

// Install: pre-cache critical shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: Network-first for HTML, Cache-first for assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET
  if (event.request.method !== 'GET') return;

  // Skip external URLs
  if (url.origin !== location.origin) return;

  // HTML pages: Network-first (always get latest)
  if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match('/henry-learning-os/')))
    );
    return;
  }

  // Static assets (JS, CSS, images): Cache-first
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|webp|woff2?|ico)$/)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Default: Network with cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
