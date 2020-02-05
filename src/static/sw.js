const CACHE = 'fluffy';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE)
            .then(function(cache) {
              cache.addAll(['/'])
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(fromCache(event.request));
    event.waitUntil(update(event.request));
});

function fromCache(request) {
    return caches.open(CACHE)
      .then(function(cache) {
        cache.match(request)
          .then(function(matching) {
              matching || Promise.reject('no-match')
          })
      });
}

function update(request) {
    return caches.open(CACHE)
      .then(function(cache) {
        fetch(request)
          .then(function(response) {
            cache.put(request, response.clone())
              .then(function() { response })
          })
      });
}