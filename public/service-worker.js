var cacheName = "cache1.3";
const STATIC_DATAS = [
  "/",
  "/favicon.ico",
  "/index.html",
  "/assets/",
  "/assets/logo.png",
  "/assets/logo.svg",
  "/assets/variables.js",
  "/assets/artists/",
  "/assets/artists/a7x.jpg",
  "/assets/artists/iron.jpg",
  "/assets/artists/linkin.jpg",
  "/assets/artists/nightwish.jpg",
  "/assets/artists/whites.jpg",
  "/assets/musics/",
  "/assets/musics/end.jpg",
  "/assets/musics/end.mp3",
  "/assets/musics/ghost.jpg",
  "/assets/musics/ghost.mp3",
  "/assets/musics/hail.jpg",
  "/assets/musics/hail.mp3",
  "/assets/musics/heaven.jpg",
  "/assets/musics/heaven.mp3",
  "/assets/musics/nightmare.jpg",
  "/assets/musics/nightmare.mp3",
  "/assets/musics/orchid.jpg",
  "/assets/musics/orchid.mp3",
  "/assets/musics/trooper.jpg",
  "/assets/musics/trooper.mp3",
  "/img/",
  "/img/icons/",
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
];
console.log("test");
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
      return cache.addAll(STATIC_DATAS);
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
