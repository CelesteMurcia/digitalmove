let gpsActivo = false;
let userLat   = NaN;
let userLng   = NaN;

try {
  gpsActivo = sessionStorage.getItem('gps') === 'true';
  userLat   = parseFloat(sessionStorage.getItem('lat'));
  userLng   = parseFloat(sessionStorage.getItem('lng'));
} catch(e) {
  console.warn('No se pudo leer sessionStorage:', e);
}


// ── 2. INICIALIZAR MAPA ──────────────────────────────────────────────────────
const centroInicial = (gpsActivo && !isNaN(userLat))
  ? [userLat, userLng]
  : [25.78848, -100.16110];

const map = L.map('map').setView(centroInicial, 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);


// ── 3. MARCADOR DEL USUARIO ──────────────────────────────────────────────────
if (gpsActivo && !isNaN(userLat)) {
  const iconoUsuario = L.divIcon({
    html: `<div style="
      width:18px; height:18px;
      background:#1565C0;
      border:3px solid white;
      border-radius:50%;
      box-shadow:0 0 0 5px rgba(21,101,192,0.25);
    "></div>`,
    iconSize: [18, 18], iconAnchor: [9, 9], className: ''
  });

  L.marker([userLat, userLng], { icon: iconoUsuario })
    .addTo(map)
    .bindPopup('Tu ubicación actual')
    .openPopup();
}


// ── 4. ICONOS DE MARCADORES ──────────────────────────────────────────────────
const iOrigen  = L.divIcon({ html: `<div class="marcador-origen"></div>`,  iconSize: [14,14], iconAnchor: [7,7],  className: '' });
const iDestino = L.divIcon({ html: `<div class="marcador-destino"></div>`, iconSize: [14,14], iconAnchor: [7,7],  className: '' });
const iParada  = L.divIcon({ html: `<div class="marcador-parada"></div>`,  iconSize: [10,10], iconAnchor: [5,5],  className: '' });

// Origen y destino
L.marker([25.782070, -100.188452], { icon: iOrigen  }).addTo(map).bindPopup('Origen: Centro de Apodaca');
L.marker([25.80045,  -100.13580 ], { icon: iDestino }).addTo(map).bindPopup('Destino: Universidad Politécnica');

// Paradas intermedias
L.marker([25.776715, -100.184839], { icon: iParada }).addTo(map).bindPopup('Parada 1');
L.marker([25.789168, -100.144996], { icon: iParada }).addTo(map).bindPopup('Parada 2');
L.marker([25.789362, -100.145242], { icon: iParada }).addTo(map).bindPopup('Parada 3');
L.marker([25.784976, -100.159624], { icon: iParada }).addTo(map).bindPopup('Parada 4');
L.marker([25.779093, -100.179286], { icon: iParada }).addTo(map).bindPopup('Parada 5');
L.marker([25.777747, -100.183938], { icon: iParada }).addTo(map).bindPopup('Parada 6');


// ── 5. ÍCONO DEL BUS ─────────────────────────────────────────────────────────
const busIcon = L.icon({
  iconUrl: 'imagenes/bus.png',   // ← ruta actualizada
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});


// ── 6. RUTA DEL BUS (una sola definición — BUG-004 corregido) ────────────────
const rutaBus = [
  [25.78197,-100.18837],[25.78148,-100.18808],[25.78121,-100.18791],
  [25.78071,-100.1876],[25.77993,-100.18711],[25.77962,-100.18692],
  [25.77939,-100.18677],[25.77915,-100.18662],[25.77838,-100.18614],
  [25.778,-100.1859],[25.77786,-100.18581],[25.77773,-100.18573],
  [25.77761,-100.18565],[25.77715,-100.18539],[25.77707,-100.18534],
  [25.77702,-100.18546],[25.77694,-100.18565],[25.77685,-100.18571],
  [25.77679,-100.18578],[25.77673,-100.18586],[25.77669,-100.18589],
  [25.77665,-100.18591],[25.77662,-100.18592],[25.77659,-100.18593],
  [25.77655,-100.18593],[25.7765,-100.18591],[25.77646,-100.1859],
  [25.77638,-100.18586],[25.77634,-100.18582],[25.7763,-100.18578],
  [25.77628,-100.18575],[25.77626,-100.18571],[25.77626,-100.18568],
  [25.77627,-100.18564],[25.7763,-100.18551],[25.77633,-100.18548],
  [25.77639,-100.18542],[25.77655,-100.18527],[25.77658,-100.18524],
  [25.77662,-100.18519],[25.77665,-100.18515],[25.77674,-100.18502],
  [25.77687,-100.18479],[25.77696,-100.18462],[25.77702,-100.18449],
  [25.77712,-100.18424],[25.77718,-100.1841],[25.77722,-100.18403],
  [25.77725,-100.18399],[25.77728,-100.18394],[25.77734,-100.18389],
  [25.77737,-100.18376],[25.77742,-100.1836],[25.77759,-100.18294],
  [25.77766,-100.18265],[25.77782,-100.18201],[25.77825,-100.1806],
  [25.7784,-100.18012],[25.77854,-100.17971],[25.77889,-100.17868],
  [25.77899,-100.17839],[25.77971,-100.17623],[25.78093,-100.17225],
  [25.78111,-100.17163],[25.7812,-100.17129],[25.78174,-100.16952],
  [25.78187,-100.1691],[25.78195,-100.16883],[25.78218,-100.16804],
  [25.78269,-100.1663],[25.78324,-100.16449],[25.78373,-100.16294],
  [25.78385,-100.16254],[25.78401,-100.16198],[25.78406,-100.16185],
  [25.78414,-100.16157],[25.78431,-100.16098],[25.78469,-100.15976],
  [25.78513,-100.1583],[25.7853,-100.15776],[25.78546,-100.15723],
  [25.78576,-100.15627],[25.7859,-100.15585],[25.78629,-100.15462],
  [25.78668,-100.15336],[25.78703,-100.15226],[25.78754,-100.15054],
  [25.78786,-100.14948],[25.78805,-100.14884],[25.78828,-100.14811],
  [25.78837,-100.14782],[25.78857,-100.14716],[25.78919,-100.14514],
  [25.78922,-100.14504],[25.78935,-100.14459],[25.78982,-100.14296],
  [25.78986,-100.14283],[25.7903,-100.14136],[25.79078,-100.13988],
  [25.79081,-100.1398],[25.79122,-100.13845],[25.79251,-100.13415],
  [25.79254,-100.1339],[25.79256,-100.13377],[25.7926,-100.13358],
  [25.79285,-100.13272],[25.79303,-100.13214],[25.79358,-100.13035],
  [25.79363,-100.13029],[25.79365,-100.13027],[25.79368,-100.13025],
  [25.79372,-100.13025],[25.79376,-100.13026],[25.7938,-100.13029],
  [25.79382,-100.13032],[25.79382,-100.13036],[25.79384,-100.13047],
  [25.7933,-100.13216],[25.79321,-100.13244],[25.79309,-100.13282],
  [25.79301,-100.13306],[25.79292,-100.13334],[25.79283,-100.13365],
  [25.79276,-100.13386],[25.7927,-100.13401],[25.79259,-100.13417],
  [25.79236,-100.13496],[25.79196,-100.13625],[25.79203,-100.13627],
  [25.79224,-100.13633],[25.79283,-100.13647],[25.7992,-100.138],
  [25.79927,-100.138],[25.79931,-100.138],[25.79934,-100.13797],
  [25.79993,-100.13651],[25.80015,-100.13599],[25.80018,-100.13588],
  [25.80019,-100.13581],[25.80019,-100.13526],[25.80019,-100.13506]
];

// Las tres unidades comparten la misma vía (BUG-004 corregido)
const rutaBus2 = rutaBus;
const rutaBus3 = rutaBus;

// Dibujar ruta de ida — azul
L.polyline(rutaBus, { color: '#1565C0', weight: 4, opacity: 0.75 }).addTo(map);

// ── RUTA DE REGRESO (coordenadas reales) ─────────────────────────────────────
const rutaRegreso = [
  [25.80021,-100.13564],
  [25.80018,-100.13597],
  [25.80005,-100.13627],
  [25.79994,-100.13656],
  [25.79977,-100.13697],
  [25.79946,-100.13775],
  [25.79934,-100.13797],
  [25.79928,-100.13802],
  [25.79908,-100.13799],
  [25.79908,-100.13798],
  [25.79753,-100.13761],
  [25.79754,-100.13763],
  [25.79203,-100.13629],
  [25.79136,-100.13842],
  [25.79137,-100.13836],
  [25.79040,-100.14142],
  [25.78976,-100.14356],
  [25.78933,-100.14506],
  [25.78932,-100.14507],
  [25.78882,-100.14678],
  [25.78881,-100.14681],
  [25.78827,-100.14858],
  [25.78827,-100.14857],
  [25.78773,-100.15041],
  [25.78774,-100.15039],
  [25.78713,-100.15238],
  [25.78713,-100.15239],
  [25.78650,-100.15447],
  [25.78651,-100.15445],
  [25.78536,-100.15819],
  [25.78537,-100.15816],
  [25.78385,-100.16311],
  [25.78377,-100.16339],
  [25.78206,-100.16879],
  [25.78205,-100.16877],
  [25.78054,-100.17394],
  [25.77929,-100.17842],
  [25.77851,-100.18102],
  [25.77776,-100.18351],
  [25.77722,-100.18529],
  [25.77720,-100.18538],
  [25.77705,-100.18533],
  [25.77706,-100.18537],
  [25.77664,-100.18613],
  [25.77662,-100.18615],
  [25.77860,-100.18738],
  [25.78096,-100.18885],
  [25.78150,-100.18916]
];

// Dibujar ruta de regreso — roja
L.polyline(rutaRegreso, { color: '#0c4383', weight: 4, opacity: 0.75 }).addTo(map);


// ── 7. ANIMACIÓN DE LOS BUSES ────────────────────────────────────────────────
let paso  = 0;
let paso2 = Math.floor(rutaBus.length / 3);
let paso3 = Math.floor(rutaBus.length / 3) * 2;

let busMarker  = L.marker(rutaBus[paso],  { icon: busIcon }).addTo(map);
let busMarker2 = L.marker(rutaBus[paso2], { icon: busIcon }).addTo(map);
let busMarker3 = L.marker(rutaBus[paso3], { icon: busIcon }).addTo(map);

setInterval(() => {
  paso++;
  if (paso >= rutaBus.length) paso = 0;
  busMarker.setLatLng(rutaBus[paso]);
}, 1500);

setInterval(() => {
  paso2++;
  if (paso2 >= rutaBus.length) paso2 = 0;
  busMarker2.setLatLng(rutaBus[paso2]);
}, 1500);

setInterval(() => {
  paso3++;
  if (paso3 >= rutaBus.length) paso3 = 0;
  busMarker3.setLatLng(rutaBus[paso3]);
}, 1500);


// ── 8. PANELES — NOTIFICACIONES Y AVISOS ─────────────────────────────────────
function abrirNotificaciones() {
  document.getElementById('notif-panel').classList.add('activo');
  document.getElementById('notif-overlay').classList.add('activo');
}

function cerrarNotificaciones() {
  document.getElementById('notif-panel').classList.remove('activo');
  document.getElementById('notif-overlay').classList.remove('activo');
}

function abrirAvisos() {
  document.getElementById('avisos-panel').classList.add('activo');
  document.getElementById('avisos-overlay').classList.add('activo');
}

function cerrarAvisos() {
  document.getElementById('avisos-panel').classList.remove('activo');
  document.getElementById('avisos-overlay').classList.remove('activo');
}


// ── 9. VER UNIDAD EN MAPA ────────────────────────────────────────────────────
function verUnidad(num) {
  let pos;
  if (num === 1) pos = rutaBus[paso];
  if (num === 2) pos = rutaBus[paso2];
  if (num === 3) pos = rutaBus[paso3];
  map.flyTo(pos, 17, { duration: 1.2 });
}


// ── 10. NAVEGACIÓN POR ÍCONOS ────────────────────────────────────────────────
function irA(tipo) {
  if (tipo === 'origen') {
    map.flyTo([25.782070, -100.188452], 17, { duration: 1.2 });
  }
  if (tipo === 'destino') {
    map.flyTo([25.80045, -100.13580], 17, { duration: 1.2 });
  }
  if (tipo === 'paradas') {
    map.flyTo([25.7880, -100.1650], 14, { duration: 1.2 });
  }
  if (tipo === 'unidades') {
    map.flyTo(rutaBus[paso], 16, { duration: 1.2 });
  }
}


// ── 11. TOAST "PRÓXIMAMENTE" (BUG-008) ───────────────────────────────────────
function mostrarProximamente(nombre) {
  const toast = document.createElement('div');
  toast.textContent = `🚧 ${nombre}: próximamente`;
  toast.style.cssText = `
    position: fixed;
    bottom: 48vh;
    left: 50%;
    transform: translateX(-50%);
    background: #1A1A2E;
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.style.opacity = '1');
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
  // Forzar a Leaflet a recalcular el tamaño del mapa
setTimeout(() => {
  map.invalidateSize();
}, 300);

}
