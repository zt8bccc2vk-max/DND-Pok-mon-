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
