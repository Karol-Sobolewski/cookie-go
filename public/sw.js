const cacheName = `cookie-go`;
const filesToCache = [
  `/images/logo/logo.svg`,
  `/images/language/muffinNB.png`,
  `/images/language/paczek.png`,
  `/images/photos/about/cookies.jpg`,
  `/images/photos/about/funding.jpg`,
  `/images/photos/about/shop.jpg`,
  `/images/photos/about/start.jpg`,
  `/images/photos/home/happiness.jpg`,
  `/images/photos/home/passion.jpg`,
  `/images/photos/home/sweetness.jpg`,
  `/images/photos/products/cakes/cherry.png`,
  `/images/photos/products/cakes/chocolate.png`,
  `/images/photos/products/cakes/strawberry.png`,
  `/images/photos/products/cookies/chocolate.png`,
  `/images/photos/products/cookies/frosting.png`,
  `/images/photos/products/cookies/peanut.png`,
  `/images/photos/products/cookies/smarties.png`,
  `/images/photos/products/cookies/snail.png`,
  `/images/photos/products/pastries/apple.png`,
  `/images/photos/products/pastries/croissant.png`,
  `/images/photos/products/pastries/cupcake.png`,
  `/images/photos/products/sweets/lollypop.png`,
  `/images/photos/products/sweets/ribbon.png`,
  `/images/photos/products/sweets/pink.png`,
  `/index.html`,
];
window.self.addEventListener(`install`, function (e) {
  console.log(`[ServiceWorker] Install`);
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log(`[ServiceWorker] Caching app shell`);
      return cache.addAll(filesToCache);
    })
  );
});
window.self.addEventListener(`activate`, (event) => {
  event.waitUntil(window.self.clients.claim());
});
window.self.addEventListener(`fetch`, (event) => {
  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then((response) => response || fetch(event.request))
  );
});
