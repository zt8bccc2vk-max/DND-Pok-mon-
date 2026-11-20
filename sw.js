// Chant & Festin — service worker (v78)
// Rôle UNIQUE : recevoir les notifications push du MJ.
// Aucun handler fetch : ce fichier ne touche JAMAIS aux requêtes de l'appli.
// À l'activation : purge de tous les caches hérités des anciennes versions
// et prise de contrôle immédiate des pages ouvertes.
self.addEventListener('install', function(e){
  self.skipWaiting();
});
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(noms){
      return Promise.all(noms.map(function(n){ return caches.delete(n); }));
    }).then(function(){ return self.clients.claim(); })
  );
});
self.addEventListener('push', function(e){
  var d = {title:'🎲 Chant & Festin', body:'Le MJ a délibéré !'};
  try { if(e.data) d = e.data.json(); } catch(err){}
  e.waitUntil(self.registration.showNotification(d.title, {
    body: d.body, icon: 'icon-192.png', badge: 'icon-192.png', tag: 'mj-resolution'
  }));
});
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window', includeUncontrolled:true}).then(function(list){
    for (var i=0;i<list.length;i++) { if ('focus' in list[i]) return list[i].focus(); }
    return clients.openWindow('./');
  }));
});
