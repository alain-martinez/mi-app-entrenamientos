const $ = (id) => document.getElementById(id);

const API_USUARIOS_URL = 'http://127.0.0.1:3000/api/usuarios'; 
const API_SESIONES_URL = 'http://127.0.0.1:3000/api/sesiones';

let usuarioActivo = null;

// GET usuarios
async function buscarYCargarUsuario() {
  const nombreBuscado = $('input-buscar-usuario').value.trim();
  const msgEstado = $('mensaje-estado-sesion');

  if (!nombreBuscado) {
    msgEstado.textContent = 'Por favor, introduce un nombre de usuario.';
    msgEstado.style.color = 'var(--danger, #ef4444)';
    return;
  }

  try {
    const respuesta = await fetch(`${API_USUARIOS_URL}?nombre=${encodeURIComponent(nombreBuscado)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        throw new Error(`El usuario "${nombreBuscado}" no existe en el servidor.`);
      }
      throw new Error(`Error del servidor (${respuesta.status})`);
    }

    const datosUsuario = await respuesta.json();
    usuarioActivo = datosUsuario;

    // Actualizar la cabecera visual
    actualizarCabeceraSesion();

    rellenarFormularioPerfil(usuarioActivo);

    msgEstado.textContent = `✓ Sesión cargada correctamente para ${usuarioActivo.nombre}.`;
    msgEstado.style.color = 'var(--ac)';

    // Guardamos nombre en localStorage
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));

  } catch (error) {
    console.error('Error al hacer GET del usuario:', error);
    msgEstado.textContent = `✕ Error: comprueba que el servidor está activo.`;
    msgEstado.style.color = 'var(--danger, #ef4444)';
  }
}

// POST: Guardar o crear usuario en el servidor
async function guardarDatosUsuario() {
  const nombre = $('input-nombre').value.trim();
  const apellido = $('input-apellido').value.trim();
  const msgEstado = $('mensaje-datos-personales');

  if (!nombre) {
    msgEstado.textContent = 'El campo Nombre es obligatorio.';
    msgEstado.style.color = 'var(--danger, #ef4444)';
    return;
  }

  if (!apellido) {
    msgEstado.textContent = 'El campo Apellido es obligatorio.';
    msgEstado.style.color = 'var(--danger, #ef4444)';
    return;
  }

  const payloadUsuario = {
    nombre,
    apellido: $('input-apellido').value.trim(),
    edad: parseInt($('input-edad').value, 10) || null,
    pesoKg: parseFloat($('input-peso').value) || null,
    alturaCm: parseInt($('input-altura').value, 10) || null,
    porcentajeGrasa: parseFloat($('input-grasa').value) || null
  };

  try {
    const respuesta = await fetch(API_USUARIOS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Content-Type le dice al server: "Lo que va en el cuerpo de esta petición es un JSON"
        'Accept': 'application/json' // Accept le dice al server: "Cuando me contestes, hazlo en formato JSON por favor"
      },
      body: JSON.stringify(payloadUsuario)
    });

    if (!respuesta.ok) {
      throw new Error(`Error del servidor (${respuesta.status})`);
    }

    usuarioActivo = await respuesta.json();
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));

    actualizarCabeceraSesion();
    $('input-buscar-usuario').value = usuarioActivo.nombre;

    msgEstado.textContent = `✓ Perfil de ${usuarioActivo.nombre} guardado en el servidor.`;
    msgEstado.style.color = 'var(--ac)';
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    msgEstado.textContent = 'No se ha podido crear/actualizar el usuario. Comprueba que el servidor esté encendido.';
    msgEstado.style.color = 'var(--danger, #ef4444)';
  }
}

// Rellenar inputs del formulario Datos Personales
function rellenarFormularioPerfil(usuario) {
  if (!usuario) return;
  $('input-nombre').value = usuario.nombre || '';
  $('input-apellido').value = usuario.apellido || '';
  $('input-edad').value = usuario.edad ?? '';
  $('input-peso').value = usuario.pesoKg ?? '';
  $('input-altura').value = usuario.alturaCm ?? '';
  $('input-grasa').value = usuario.porcentajeGrasa ?? '';

  recalcularMetricas();
}

// Cálculo en vivo de IMC, BMR y Masa Magra
function recalcularMetricas() {
  const edad = parseInt($('input-edad').value, 10);
  const peso = parseFloat($('input-peso').value);
  const altura = parseInt($('input-altura').value, 10);
  const grasa = parseFloat($('input-grasa').value);

  if (peso > 0 && altura > 0) {
    const alturaM = altura / 100;
    const imc = peso / (alturaM * alturaM);
    $('info-imc').textContent = `IMC: ${imc.toFixed(1)}`;
  } else {
    $('info-imc').textContent = 'IMC: --';
  }

  let lbm = null;
  if (peso > 0 && grasa >= 0 && grasa < 100) {
    lbm = peso * (1 - grasa / 100);
    $('info-lbm').textContent = `Masa Magra Estimada: ${lbm.toFixed(1)} kg`;
  } else {
    $('info-lbm').textContent = 'Masa Magra Estimada: -- kg';
  }

  if (lbm) {
    const bmr = 370 + (21.6 * lbm);
    $('info-bmr').textContent = `Metabolismo Basal (BMR): ${Math.round(bmr)} kcal/día`;
  } else if (peso > 0 && altura > 0 && edad > 0) {
    const bmr = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
    $('info-bmr').textContent = `Metabolismo Basal (BMR): ${Math.round(bmr)} kcal/día`;
  } else {
    $('info-bmr').textContent = 'Metabolismo Basal (BMR): -- kcal/día';
  }
}

// Actualizar Sesión para: ...
function actualizarCabeceraSesion() {
  const infoElem = $('info-usuario-activo');
  if (!infoElem) return;

  if (usuarioActivo && usuarioActivo.nombre) {
    const apellido = usuarioActivo.apellido ? ` ${usuarioActivo.apellido}` : '';
    infoElem.textContent = `Sesión para: ${usuarioActivo.nombre}${apellido}`;
  } else {
    infoElem.textContent = 'Sesión para: Sin usuario seleccionado.';
  }
}

// Restaurar sesión de localStorage
function restaurarSesionLocal() {
  const guardado = localStorage.getItem('usuarioActivo');
  if (guardado) {
    try {
      usuarioActivo = JSON.parse(guardado);
      actualizarCabeceraSesion();
      rellenarFormularioPerfil(usuarioActivo);
      if ($('input-buscar-usuario')) {
        $('input-buscar-usuario').value = usuarioActivo.nombre || '';
      }
    } catch (e) {}
  }
}

// Descarga cualquier endpoint JSON como archivo local
async function descargarArchivoJSON(urlEndpoint, nombreArchivo) {
  let msgEstado;
  if(nombreArchivo === "usuarios.json") { msgEstado = $('mensaje-descargar-usuarios'); } 
  else { msgEstado = $('mensaje-descargar-sesiones'); }

  try {
    const respuesta = await fetch(urlEndpoint);
    if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);

    const datos = await respuesta.json();
    const jsonFormateado = JSON.stringify(datos, null, 2);

    const blob = new Blob([jsonFormateado], { type: 'application/json' });
    const urlDescarga = URL.createObjectURL(blob);

    const enlace = document.createElement('a');
    enlace.href = urlDescarga;
    enlace.download = nombreArchivo;
    document.body.appendChild(enlace);
    enlace.click();

    enlace.remove();
    URL.revokeObjectURL(urlDescarga);
  } catch (error) {
    console.error(`Error al descargar ${nombreArchivo}:`, error);
    msgEstado.textContent = `No se pudo descargar ${nombreArchivo}. Comprueba que el servidor esté encendido.`;
    msgEstado.style.color = 'var(--danger, #ef4444)';
  }
}

// Eventos
$('btn-iniciar-sesion').addEventListener('click', buscarYCargarUsuario);
$('btn-guardar-usuario').addEventListener('click', guardarDatosUsuario);
$('btn-descargar-json-usuarios').addEventListener('click', () => {
  descargarArchivoJSON(API_USUARIOS_URL, 'usuarios.json');
});

$('btn-descargar-json-sesiones').addEventListener('click', () => {
  descargarArchivoJSON(API_SESIONES_URL, 'sesiones.json');
});

// Recalcular metricas en tiempo real
['input-edad', 'input-peso', 'input-altura', 'input-grasa'].forEach((id) => {
  $(id).addEventListener('input', recalcularMetricas);
});

// Permitir pulsar "Enter" dentro del input para buscar directamente
$('input-buscar-usuario').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    buscarYCargarUsuario();
  }
});

// Inicialización
restaurarSesionLocal();