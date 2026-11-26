const MAX_USUARIO = 20;
const MAX_PASSWORD = 64;

export function validarCredencialesLogin(usuario, password, esRegistro = false) {
  if (typeof usuario !== "string" || typeof password !== "string") {
    return "Formato de credenciales inválido.";
  }

  const usuarioLimpio = usuario.trim();

  if (!usuarioLimpio || !password) {
    return "Introduce tu usuario y contraseña.";
  }

  if (usuarioLimpio.length > MAX_USUARIO) {
    return `El usuario no puede superar los ${MAX_USUARIO} caracteres.`;
  }

  if (password.length > MAX_PASSWORD) {
    return `La contraseña no puede superar los ${MAX_PASSWORD} caracteres.`;
  }

  return null;
}