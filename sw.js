const CACHE_NAME = "CACHE_NAME_V1";

const CACHE_FILES = ["./", "/index.html", "/index.js", "/style.css"];

self.addEventListener("install", function(evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_FILES))
  );
});

self.addEventListener("fetch", function(evt) {
  evt.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(evt.request).then(resp => {
        return (
          resp ||
          fetch(evt.request).then(response => {
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }
          })
        );
      });
    })
  );
});
