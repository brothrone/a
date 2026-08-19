/* 파라써블 코칭 데모 — 오프라인 캐시 서비스워커
   발표장 네트워크가 끊겨도 데모가 그대로 돌아가야 하므로 전체를 미리 캐시한다.
   캐시를 갱신하려면 VERSION 을 올린다. */
const VERSION = 'coach-v1';
const PRECACHE = [
  './',
  './index.html',
  './app.html',
  './live.html',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './figs/fig1_scatter.png',
  './figs/fig2_residual.png',
  './figs/fig3_error.png',
  './figs/fig4_waterfall.png',
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    // 개별 실패가 전체 설치를 막지 않도록 하나씩 담는다
    await Promise.all(PRECACHE.map(u => c.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // 외부 요청은 관여하지 않는다

  // HTML(문서)은 네트워크 우선 — 온라인이면 항상 최신 데모를 본다
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const c = await caches.open(VERSION);
        c.put(req, fresh.clone());
        return fresh;
      } catch (_) {
        return (await caches.match(req)) || (await caches.match('./app.html')) || Response.error();
      }
    })());
    return;
  }

  // 그 외(아이콘·그래프)는 캐시 우선 — 빠르고, 오프라인에서도 뜬다
  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const fresh = await fetch(req);
      const c = await caches.open(VERSION);
      c.put(req, fresh.clone());
      return fresh;
    } catch (_) {
      return Response.error();
    }
  })());
});
