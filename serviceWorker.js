const staticBooks = "Books";
const assets = [
  "/Views/index.html",
  "/Styles/css.css",
  "/main.js",
  "/Scripts/Models/BookModel.js",
  "/Scripts/Services/AccuWeatherService.js",
  "/Scripts/ViewModel/BookViewModel.js",
  "Scripts/ViewModel/CompleteViewModel.js",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticBooks).then((cache) => {
      return cache.addAll(assets).catch((error) => {
        console.error("Failed to cache resources:", error);
      });
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
