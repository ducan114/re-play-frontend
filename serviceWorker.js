console.log('Service worker loaded');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push received');
  self.registration.showNotification(data.title, {
    body: 'Notification body',
    icon: 'http://image.ibb.co/frY0Fd/tmlogo.png'
  });
});
