const C='violao-v2',F=['./','./index.html','./pro.js','./pro.css','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r.ok&&r.type!='opaque'){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request)))});
self.addEventListener('periodicsync',e=>{if(e.tag==='daily')e.waitUntil(self.registration.showNotification('Violão com Emanuel Víctor',{body:'Hora de praticar! 10 minutinhos já fazem diferença 🎸',icon:'icon-192.png',tag:'daily'}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.openWindow('./index.html'))});
