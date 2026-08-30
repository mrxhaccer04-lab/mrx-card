self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('mrx-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/gmail-login.html',
        '/select-diamonds.html',
        '/game-id.html',
        '/processing.html',
        '/rejected.html'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
