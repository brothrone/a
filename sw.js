/* 파라써블 코칭 데모 — 오프라인 캐시 서비스워커
   발표장 네트워크가 끊겨도 데모가 그대로 돌아가야 하므로 전체를 미리 캐시한다.
   캐시를 갱신하려면 VERSION 을 올린다. */
const VERSION = 'coach-v5';
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

/* 보이스팩 음성 클립 — 오프라인에서 시스템 TTS 음성이 없어도 소리가 나오도록 전부 캐시한다 */
const LINES = [
  "A-0","A-1","A-2","B-0","B-1","B-2","C-0","C-1","C-2",
  "D-0","D-1","D-2","E-0","E-1","E-2",
  "sys-stranded","sys-split1","sys-split2","sys-done","sys-charged",
];
const PACKS = ["iu","hanni","karina","jk","san","bogum",
  "tiniping","pororo","jjanggu","dog","cat","petetc",
  "lyw","hyunbin","sks"];
for (const l of LINES) PRECACHE.push(`./audio/lines/${l}.m4a`);
for (const p of PACKS) PRECACHE.push(`./audio/preview/${p}.m4a`);

/* 한 번에 몰아서 요청하면 느린 회선이나 단순한 서버에서 상당수가 실패하는데,
   실패를 삼키면 '캐시된 줄 알았는데 오프라인에서 안 열리는' 상태가 된다.
   소량씩 나눠 받고, 실패한 것만 한 번 더 시도한다. */
const BATCH = 6;
async function precache(c, urls) {
  const failed = [];
  for (let i = 0; i < urls.length; i += BATCH) {
    const part = urls.slice(i, i + BATCH);
    const res = await Promise.all(part.map(u => c.add(u).then(() => null, () => u)));
    res.forEach(u => { if (u) failed.push(u); });
  }
  return failed;
}

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    let failed = await precache(c, PRECACHE);
    if (failed.length) failed = await precache(c, failed);   // 실패분 재시도
    if (failed.length) console.warn('[sw] 캐시 실패', failed.length, '개', failed.slice(0, 5));
    else console.log('[sw] 프리캐시 완료', PRECACHE.length, '개');
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
