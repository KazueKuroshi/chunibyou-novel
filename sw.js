const CACHE_NAME = "chuni-market-cache-v1";
const urlsToCache = [
  "index.html",
  "project.html",
  "about.html",
  "community.html",
  "styles/main.css",
  "styles/community.css",
  "scripts/main.js",
  "scripts/community.js",
  "data/novels.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
