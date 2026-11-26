import { validarCredencialesRegister } from './auth.utils.js';

const btnCrearCuenta = document.getElementById("btn-crear-cuenta");
const btnVolverLogin = document.getElementById("btn-volver-login");
const inputUsuario = document.getElementById("input-nombre-usuario");
const inputContrasena = document.getElementById("input-contrasena-usuario");
const inputRepiteContrasena = document.getElementById("input-repite-contrasena");
const mensajeError = document.getElementById("mensaje-error");

// Registrarse
btnCrearCuenta.addEventListener("click", () => {
    let respuestaValidacion = validarCredencialesRegister(inputUsuario.value, inputContrasena.value, inputRepiteContrasena.value);

    if (respuestaValidacion != null) { mensajeError.textContent = respuestaValidacion; } 
    else { mensajeError.textContent = ""; }
});

// Volver al Login
btnVolverLogin.addEventListener("click", () => {
    window.location.href = "./login.html";
});