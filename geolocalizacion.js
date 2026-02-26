// =============================================
//  geolocalizacion.js
//  Solicita permiso de GPS al usuario
//  y guarda las coordenadas para pagina1.html
//  Digital Move
// =============================================

function pedirUbicacion() {

  const btn = document.querySelector('.btn-continuar');

  // Verificar si el navegador soporta GPS
  if (!navigator.geolocation) {
    // No soporta GPS, redirigir igual sin coordenadas
    sessionStorage.setItem('gps', 'false');
    window.location.href = 'pagina1.html';
    return;
  }

  // Cambiar texto del botón para indicar que está procesando
  btn.textContent = 'Obteniendo ubicación...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  // *** AQUÍ APARECE EL POPUP DE PERMISO EN EL CELULAR ***
  navigator.geolocation.getCurrentPosition(

    // ✅ CASO 1: El usuario ACEPTÓ el permiso
    function(position) {
      // Guardar coordenadas en sessionStorage
      // (disponibles mientras el navegador esté abierto)
      sessionStorage.setItem('gps', 'true');
      sessionStorage.setItem('lat', position.coords.latitude);
      sessionStorage.setItem('lng', position.coords.longitude);

      console.log('✅ GPS obtenido:', position.coords.latitude, position.coords.longitude);

      // Pequeña pausa y redirigir a pagina1.html
      setTimeout(function() {
        window.location.href = 'pagina1.html';
      }, 600);
    },

    // ❌ CASO 2: El usuario NEGÓ el permiso o hubo error
    function(error) {
      sessionStorage.setItem('gps', 'false');

      console.warn('GPS no disponible:', error.message);

      // Redirigir igual aunque no haya GPS
      setTimeout(function() {
        window.location.href = 'pagina1.html';
      }, 600);
    },

    // Opciones del GPS
    {
      enableHighAccuracy: true, // Máxima precisión
      timeout: 10000,           // Esperar máximo 10 segundos
      maximumAge: 0             // No usar caché
    }
  );
}