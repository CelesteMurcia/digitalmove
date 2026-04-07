function pedirUbicacion() {
  const btn = document.querySelector('.btn-continuar');

  if (!navigator.geolocation) {
    sessionStorage.setItem('gps', 'false');
    window.location.href = 'loading.html';
    return;
  }

  if (btn) {
    btn.textContent = 'Obteniendo ubicación...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
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
      setTimeout(function() {
        window.location.href = 'loading.html';
      }, 300);
    },
    function(error) {
      try { sessionStorage.setItem('gps', 'false'); } catch(e) {}
      console.warn('GPS no disponible:', error.message);
      setTimeout(function() {
        window.location.href = 'loading.html';
      }, 300);
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}


// ── FUNCIÓN CON CALLBACK (loading.html → llama callback al terminar) ──
function pedirUbicacionConCallback(callback) {

  // Si el GPS ya fue resuelto en index.html, los datos ya están en sessionStorage
  const yaResuelto = sessionStorage.getItem('gps') !== null;

  if (yaResuelto) {
    // Pausa mínima para que el spinner sea visible
    setTimeout(function() {
      if (typeof callback === 'function') callback();
    }, 800);
    return;
  }

  // Si llegamos sin datos previos (acceso directo a loading.html), pedimos GPS
  if (!navigator.geolocation) {
    sessionStorage.setItem('gps', 'false');
    setTimeout(function() {
      if (typeof callback === 'function') callback();
    }, 800);
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
      if (typeof callback === 'function') callback();
    },
    function(error) {
      try { sessionStorage.setItem('gps', 'false'); } catch(e) {}
      console.warn('GPS no disponible:', error.message);
      if (typeof callback === 'function') callback();
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}
