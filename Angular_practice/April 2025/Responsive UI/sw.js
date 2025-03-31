const CACHE_NAME = 'ecommerce-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  'icon-192x192.png',
  'icon-512x512.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch Event (Offline Support)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Push Notification Event
self.addEventListener('push', (event) => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'icon-192x192.png'
    });
  });
  
  // Background Sync Event
  self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-cart') {
      event.waitUntil(syncCartItems());
    }
  });
  
  function syncCartItems() {
    return fetch('/api/sync-cart')
      .then(response => console.log('Cart synced!'))
      .catch(err => console.log('Sync failed:', err));
  }