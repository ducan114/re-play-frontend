console.log('Service worker loaded');

self.addEventListener('push', e => {
  const { title, body, url } = e.data.json();
  console.log('Push received');
  self.registration.showNotification(title, {
    body,
    data: url
  });
});

self.addEventListener('notificationclick', e => {
  console.log('Notification clicked');
  const url = e.notification.data;
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
