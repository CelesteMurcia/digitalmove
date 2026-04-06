function pedirUbicacion() {
  const btn = document.querySelector('.btn-continuar');

  if (!navigator.geolocation) {
    sessionStorage.setItem('gps', 'false');
    window.location.href = 'pagina1.html';
    return;
  }

  btn.textContent = 'Obteniendo ubicación...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  navigator.geolocation.getCurrentPosition(
    function(position) {
      try {
        sessionStorage.setItem('gps', 'true');
        sessionStorage.setItem('lat', position.coords.latitude);
        sessionStorage.setItem('lng', position.coords.longitude);
      } catch(e) {
        // Safari modo privado bloquea sessionStorage — continuar sin GPS
        console.warn('sessionStorage no disponible:', e);
      }
      setTimeout(function() {
        window.location.href = 'pagina1.html';
      }, 600);
    },
    function(error) {
      try {
        sessionStorage.setItem('gps', 'false');
      } catch(e) {}
      console.warn('GPS no disponible:', error.message);
      setTimeout(function() {
        window.location.href = 'pagina1.html';
      }, 600);
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}