// =============================================
//  geolocalizacion.js
//  Lógica de geolocalización — Digital Move
// =============================================

function pedirUbicacion() {
  // Activar animación dentro de la card
  if (typeof window._iniciarAnimacion === 'function') {
    window._iniciarAnimacion();
  }

  if (!navigator.geolocation) {
    try { sessionStorage.setItem('gps', 'false'); } catch(e) {}
    if (typeof window._onGpsListo === 'function') window._onGpsListo();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function(position) {
      try {
        sessionStorage.setItem('gps', 'true');
        sessionStorage.setItem('lat', position.coords.latitude);
        sessionStorage.setItem('lng', position.coords.longitude);
      } catch(e) {
        console.warn('sessionStorage no disponible:', e);
      }
      if (typeof window._onGpsListo === 'function') window._onGpsListo();
    },
    function(error) {
      try { sessionStorage.setItem('gps', 'false'); } catch(e) {}
      console.warn('GPS no disponible:', error.message);
      if (typeof window._onGpsListo === 'function') window._onGpsListo();
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}
