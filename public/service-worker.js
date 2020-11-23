var cacheName = "cache1.3";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => {
      // Le Service Worker est déclaré !
      console.log("Service Worker déclaré !");
    })
    .catch((error) => {
      // Il y a eu un problème
      console.error("Erreur: ", error);
    });
}

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        "/",
        "/img/icons/android-chrome-192x192.png",
        "/img/icons/android-chrome-512x512.png",
        "/img/icons/android-chrome-maskable-192x192.png",
        "/img/icons/android-chrome-maskable-512x512.png",
        "/img/icons/apple-touch-icon-60x60.png",
        "/img/icons/apple-touch-icon-76x76.png",
        "/img/icons/apple-touch-icon-120x120.png",
        "/img/icons/apple-touch-icon-152x152.png",
        "/img/icons/apple-touch-icon-180x180.png",
        "/img/icons/apple-touch-icon.png",
        "/img/icons/favicon-16x16.png",
        "/img/icons/favicon-32x32.png",
        "/favicon.ico",
        "/index.html",
      ]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
