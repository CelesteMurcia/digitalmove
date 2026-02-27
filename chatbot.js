// ===== CHATBOT DIGITAL MOVE =====

function abrirChat() {
  document.getElementById('chat-panel').classList.add('activo');
  document.getElementById('chat-overlay').classList.add('activo');
}

function cerrarChat() {
  document.getElementById('chat-panel').classList.remove('activo');
  document.getElementById('chat-overlay').classList.remove('activo');
  setTimeout(resetChat, 400);
}

function resetChat() {
  document.getElementById('chat-messages').innerHTML = `
    <div class="chat-burbuja bot">
      <div class="bot-avatar"><i class="fa-regular fa-comment-dots"></i></div>
      <div class="burbuja-texto">
        ¡Hola! Soy el asistente de <strong>Digital Move</strong>. 
        ¿En qué puedo ayudarte?
      </div>
    </div>`;
  document.getElementById('chat-opciones').innerHTML = opcionesIniciales();
}

function opcionesIniciales() {
  return `
    <button class="chat-btn" onclick="responder('horario')">
      <i class="fa-regular fa-clock"></i> Horario de servicio
    </button>
    <button class="chat-btn" onclick="responder('caracteristicas')">
      <i class="fa-solid fa-star"></i> Características de las unidades
    </button>
    <button class="chat-btn" onclick="responder('ruta')">
      <i class="fa-solid fa-route"></i> Ruta del servicio
    </button>
    <button class="chat-btn" onclick="responder('capacidad')">
      <i class="fa-solid fa-users"></i> Capacidad de las unidades
    </button>
    <button class="chat-btn" onclick="responder('contacto')">
      <i class="fa-solid fa-envelope"></i> Contacto
    </button>`;
}

const respuestas = {
  horario: {
    pregunta: '¿Cuál es el horario de servicio?',
    texto: `El servicio opera en dos turnos:<br><br>
      <ul>
        <li><i class="fa-solid fa-sun"></i> <strong>Matutino:</strong> 5:30 a.m. y 7:00 a.m.</li>
        <li><i class="fa-solid fa-cloud-sun"></i> <strong>Vespertino:</strong> 1:00 p.m. y 2:00 p.m.</li>
      </ul>`
  },
  caracteristicas: {
    pregunta: '¿Qué características tienen las unidades?',
    texto: `Nuestras unidades cuentan con:<br><br>
      <ul>
        <li><i class="fa-solid fa-snowflake"></i> Aire acondicionado</li>
        <li><i class="fa-solid fa-wifi"></i> Wi-Fi gratuito</li>
        <li><i class="fa-solid fa-satellite-dish"></i> GPS en tiempo real</li>
        <li><i class="fa-solid fa-circle-check"></i> Choferes verificados</li>
        <li><i class="fa-solid fa-tag"></i> Servicio completamente gratuito</li>
      </ul>`
  },
  ruta: {
    pregunta: '¿Cuál es la ruta del servicio?',
    texto: `La ruta opera de la siguiente manera:<br><br>
      <ul>
        <li><i class="fa-solid fa-location-dot" style="color:#E53935;"></i> <strong>Origen:</strong> Centro de Apodaca</li>
        <li><i class="fa-solid fa-location-dot" style="color:#43A047;"></i> <strong>Destino:</strong> Universidad Politécnica de Apodaca</li>
        <li><i class="fa-solid fa-road"></i> El recorrido cubre las principales avenidas del municipio</li>
      </ul>`
  },
  capacidad: {
    pregunta: '¿Cuántas personas caben en cada unidad?',
    texto: `Cada unidad tiene una capacidad de <strong>50 pasajeros</strong>.<br><br>
      <ul>
        <li><i class="fa-solid fa-users"></i> Capacidad total: 50 personas</li>
        <li><i class="fa-solid fa-mobile-screen"></i> Consulta la ocupación en tiempo real desde la pantalla principal</li>
      </ul>`
  },
  contacto: {
    pregunta: '¿Cómo los contacto?',
    texto: `Puedes comunicarte con nosotros por:<br><br>
      <ul>
        <li><i class="fa-solid fa-envelope"></i> digitalmove_oficial@gmail.com</li>
        <li><i class="fa-brands fa-facebook" style="color:#1565C0;"></i> Facebook: <strong>Digital Move</strong></li>
        <li><i class="fa-brands fa-instagram" style="color:#C2185B;"></i> Instagram: <strong>@digitalmove_st</strong></li>
      </ul>`
  }
};

function responder(clave) {
  const data = respuestas[clave];
  const mensajes = document.getElementById('chat-messages');

  mensajes.innerHTML += `
    <div class="chat-burbuja usuario">
      <div class="burbuja-texto">${data.pregunta}</div>
    </div>`;

  setTimeout(() => {
    mensajes.innerHTML += `
      <div class="chat-burbuja bot">
        <div class="bot-avatar"><i class="fa-regular fa-comment-dots"></i></div>
        <div class="burbuja-texto">${data.texto}</div>
      </div>`;

    document.getElementById('chat-opciones').innerHTML = `
      <button class="chat-btn chat-volver" onclick="resetChat()">
        <i class="fa-solid fa-arrow-left"></i> Ver otras preguntas
      </button>`;

    mensajes.scrollTop = mensajes.scrollHeight;
  }, 400);

  mensajes.scrollTop = mensajes.scrollHeight;
}