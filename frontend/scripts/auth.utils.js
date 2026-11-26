const MIN_USUARIO = 3;
const MAX_USUARIO = 20;
const MIN_PASSWORD = 8;
const MAX_PASSWORD = 64;
const REGEX_USUARIO = /^[a-zA-Z0-9_]+$/;

export function validarCredencialesLogin(usuario, password) {
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

export function validarCredencialesRegister(usuario, password, confirmarPassword) {
  const errorBase = validarCredencialesLogin(usuario, password);
  if (errorBase !== null) {
    return errorBase;
  }

  if (typeof confirmarPassword !== "string" || !confirmarPassword) {
    return "Debes confirmar la contraseña.";
  }

  const usuarioLimpio = usuario.trim();

  if (usuarioLimpio.length < MIN_USUARIO) {
    return `El usuario debe tener al menos ${MIN_USUARIO} caracteres.`;
  }

  if (!REGEX_USUARIO.test(usuarioLimpio)) {
    return "El usuario solo puede contener letras, números y guiones bajos (_).";
  }

  if (password.length < MIN_PASSWORD) {
    return `La contraseña debe tener al menos ${MIN_PASSWORD} caracteres.`;
  }

  if (password !== confirmarPassword) {
    return "Las contraseñas no coinciden.";
  }

  return null;
}