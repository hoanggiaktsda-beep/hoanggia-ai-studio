const CACHE="hoanggia-ai-v2";
const OLD_CACHES=["hoanggia-ai-v1"];
const SHELL=["./","./index.html","./manifest.webmanifest","./brand-mark.svg","./brand.svg","./icon-180.svg","./icon-192.svg","./icon-512.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(Promise.all(OLD_CACHES.map(k=>caches.delete(k))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  if(!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(fetch(e.request).then(r=>{
    const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return r;
  }).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==="navigate"?caches.match("./index.html"):Response.error()))));
});