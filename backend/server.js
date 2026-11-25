const { createServer } = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const hostname = '127.0.0.1';
const port = 3000;

const DIR_DATA = path.join(__dirname, 'data');
const FILE_USUARIOS = path.join(DIR_DATA, 'usuarios.json');
const FILE_SESIONES = path.join(DIR_DATA, 'sesiones.json');

let usuarios = [];
let sesiones = [];

// Función de inicialización al arrancar el servidor
function inicializarAlmacenamiento() {
  // Si no existe la carpeta /data, la creamos
  if (!fs.existsSync(DIR_DATA)) {
    fs.mkdirSync(DIR_DATA, { recursive: true });
    console.log('Carpeta /data creada.');
  }

  // Comprobar si existe usuarios.json
  if (!fs.existsSync(FILE_USUARIOS)) {
    usuarios = [];
    fs.writeFileSync(FILE_USUARIOS, JSON.stringify(usuarios, null, 2), 'utf-8');
    console.log('Archivo data/usuarios.json creado.');
  } else {
    try {
      const contenido = fs.readFileSync(FILE_USUARIOS, 'utf-8');
      usuarios = JSON.parse(contenido);
      console.log(`Archivo data/usuarios.json cargado (${usuarios.length} usuarios en memoria).`);
    } catch (error) {
      console.error('Error al leer usuarios.json, iniciando lista vacía:', error.message);
      usuarios = [];
    }
  }

  // Comprobar si existe sesiones.json
  if (!fs.existsSync(FILE_SESIONES)) {
    sesiones = [];
    fs.writeFileSync(FILE_SESIONES, JSON.stringify(sesiones, null, 2), 'utf-8');
    console.log('Archivo data/sesiones.json creado.');
  } else {
    try {
      sesiones = JSON.parse(fs.readFileSync(FILE_SESIONES, 'utf-8'));
      console.log(`Archivo data/sesiones.json cargado (${sesiones.length} sesiones en memoria).`);
    } catch (error) {
      sesiones = [];
    }
  }
}

inicializarAlmacenamiento();

const server = createServer((req, res) => {
  // 1. Cabeceras CORS (necesaria para hacer peticiones de un puerto a otro y que no sean bloqueadas por el navegador)
  // El cliente con live server envia las peticiones desde 5500, pero el server las recibe en el 3000
  // El navegador las considera dos webs distintas, por lo que las bloquaría para que una web maliciosa no acceda a otro puerto
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  // Responder rápido a las peticiones preflight (OPTIONS) del navegador
  // Cuando se hace una petición no simple como un POST, el navegador no lanza directamente tus datos.
  // Primero, hace una llamada auto de reconocimiento usando el método HTTP OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(204); // 204 No Content ("Todo bien, sin cuerpo de respuesta")
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const ruta = url.pathname;

  // GET /api/usuarios
  if (ruta === '/api/usuarios' && req.method === 'GET') {
    const nombreBuscado = url.searchParams.get('nombre');

    // Si no pasan ?nombre=..., devolvemos toda la lista de usuarios
    if (!nombreBuscado) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(usuarios));
      return;
    }

    // Buscar usuario ignorando mayúsculas/minúsculas
    const usuarioEncontrado = usuarios.find(
      (u) => u.nombre && u.nombre.toLowerCase() === nombreBuscado.trim().toLowerCase()
    );

    if (usuarioEncontrado) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(usuarioEncontrado));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: `Usuario "${nombreBuscado}" no encontrado.` }));
    }
    return;
  }

  // Ruta: POST /api/usuarios (Crear o actualizar usuario)
  if (ruta === '/api/usuarios' && req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const datos = JSON.parse(body);

        if (!datos.nombre || !datos.nombre.trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'El nombre es obligatorio.' }));
          return;
        }

        const nombreLimpio = datos.nombre.trim();
        const indice = usuarios.findIndex(
          (u) => u.nombre.toLowerCase() === nombreLimpio.toLowerCase()
        );

        const usuarioFinal = {
          nombre: nombreLimpio,
          apellido: datos.apellido || '',
          edad: datos.edad ?? null,
          pesoKg: datos.pesoKg ?? null,
          alturaCm: datos.alturaCm ?? null,
          porcentajeGrasa: datos.porcentajeGrasa ?? null
        };

        if (indice !== -1) {
          usuarios[indice] = usuarioFinal;
        } else {
          usuarios.push(usuarioFinal);
        }

        fs.writeFileSync(FILE_USUARIOS, JSON.stringify(usuarios, null, 2), 'utf-8');

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(usuarioFinal));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'JSON inválido.' }));
      }
    });
    return;
  }

  // Ruta: GET /api/sesiones (Devuelve todas las sesiones o filtra por ?usuario=...)
  if (ruta === '/api/sesiones' && req.method === 'GET') {
    const usuarioFiltro = url.searchParams.get('usuario');

    if (!usuarioFiltro) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(sesiones));
      return;
    }

    const filtradas = sesiones.filter(
      (s) => s.usuario && s.usuario.toLowerCase() === usuarioFiltro.trim().toLowerCase()
    );
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(filtradas));
    return;
  }

  // Cualquier otra ruta no definida -> 404
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});