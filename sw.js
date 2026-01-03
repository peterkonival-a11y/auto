const CACHE_NAME = 'diesel-ev-pwa-v1';

self.addEventListener('install', event => {
  self.skipWaiting(); // Aktivuje nového SW okamžite
});

self.addEventListener('activate', event => {
  // Vymaže starú cache pri aktivácii
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  // Najprv skontroluje cache, potom sie?
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});