// install service worker
self.addEventListener("install", (e) => console.log("SW installed"));

// activate service worker
self.addEventListener("activate", (e) => console.log("SW active"));

// fetch event
self.addEventListener("fetch", (e) => console.log("fetch event", e));
