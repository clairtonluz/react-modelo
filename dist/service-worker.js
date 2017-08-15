var cacheName = 'bytecom-1';
var filesToCache = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/assets/css/materialize.min.css',
    '/assets/css/font-awesome.min.css',
    '/assets/fonts/roboto/Roboto-Regular.woff2',
    '/assets/fonts/fontawesome-webfont.woff2?v=4.7.0',
    '/assets/js/app.bundle.js',
    '/assets/js/jquery.min.js',
    '/assets/js/materialize.min.js',
    '/assets/images/sidebar-background.jpg'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    var dataUrl = 'https://meudominio.com.br/api/recurso';
    if (e.request.url.indexOf(dataUrl) > -1) {
        e.respondWith(
            caches.open(cacheName).then(function(cache) {
                return fetch(e.request).then(function(response){
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        e.respondWith(
            caches.match(e.request).then(function(response) {
                return response || fetch(e.request);
            })
        );
    }
});