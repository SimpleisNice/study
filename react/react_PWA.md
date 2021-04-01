# React, 리액트로 만든 페이지 Progressive Web App

# PWA
Progressive Web App

Reliable
- Service workers(pre-cache key resources 를 가능하게 해주는 client-side 프록시)는 네트워크의 상태에 상관없이 유저에게 즉각적이고 안정적인 화면을 제공

Fast
- 53%정도의 유저들은 사이트에 들어갈때 3초 이상 페이지 로딩이 걸리게 되면 떠나간다고 합니다. 그리고 한 번 이상 로드되었다면 그 다음부터는 더 빠르게 페이지를 불러올 수 있어야 한다고 해요.

Engaging
- PWA는 설치가 가능하여서 유저의 디바이스에 유지시킬 수 있습니다. 또한 홈스크린 아이콘을 변경할 수 있고, 처음에 뜨길 원하는 페이지를 설정할수도 있습니다.


# Make

## Step 1: Set Up a Simple React App
```
npx create-react-app pwaTest
```

## Step2: Use the audits Tab in Chrome Dev Tools
크롬 개발자 도구의 Audits 탭을 이용
- 해당 탭을 이용하면, 웹 페이지가 PWA 로써 동작 가능한지 checklist 를 제공한다.
- 요게 현재는 light house

## Step3: Register a Service Worker
Service workers
- Service workers(pre-cache key resources 를 가능하게 해주는 client-side 프록시)는 네트워크의 상태에 상관없이 유저에게 즉각적이고 안정적인 화면을 제공해준다.

```js
var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
  '/',
  '/completed',
]

self.addEventListener ('install', event => {
  event.watiUtil (
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith (
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  )
})

self.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-task-manager'];
  event.watiUtil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    })
  );
});
```
- Update your index.html file in the public folder(public/index.html) to check if the client's browser supports service workers(17- 31) 