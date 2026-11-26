import { validarCredencialesLogin } from './auth.utils.js';

const frasesMotivadoras = [
  "Nunca es tarde para proponerse un cambio.",
  "La disciplina pesa gramos; el arrepentimiento, toneladas.",
  "Un entrenamiento más, una excusa menos.",
  "Un día más es un día menos.",
  "Hoy puedes con todo.",
  "No sabes lo sexy que estás hoy.",
  "Eres perfectamente imperfecto.",
  "No se trata de tener tiempo, se trata de sacar tiempo.",
  "El progreso lento sigue siendo progreso.",
  "El trabajo supera al talento.",
  "La motivación te arranca, el hábito te mantiene.",
  "No tienes que estar al 100%, solo tienes que aparecer.",
  "El único entreno malo es el no hecho.",
  "Dentro de un mes agradecerás haber empezado hoy.",
  "Cuesta más quedarse igual que cambiar.",
  "Hazlo sin ganas, pero hazlo.",
  "La constancia gana donde la intensidad abandona.",
  "Hoy toca sumar otro ladrillo.",
  "Tu yo del futuro te está mirando.",
  "Qué bien te sienta no rendirte.",
  "Menos pensar, más levantar.",
  "Haz hoy aquello de lo que no te vayas a arrepentir mañana.",
  "No dejes para mañana lo que puedas hacer hoy.",
  "Sientete orgulloso de estar aquí."
];

const btnIniciarSesion = document.getElementById("btn-iniciar-sesion");
const btnRegistrarse = document.getElementById("btn-registrarse");
const inputUsuario = document.getElementById("input-nombre-usuario");
const inputContrasena = document.getElementById("input-contrasena-usuario");
const mensajeError = document.getElementById("mensaje-error");

/* Frases motivadoras */ 
document.addEventListener("DOMContentLoaded", () => {
  const elementoFrase = document.getElementById("frase-motivadora");
  
  if (elementoFrase) {
    const indiceAleatorio = Math.floor(Math.random() * frasesMotivadoras.length);
    elementoFrase.textContent = frasesMotivadoras[indiceAleatorio];
  }
});

/* Inicio sesion */
btnIniciarSesion.addEventListener("click", (evento) => {
  let respuestaValidacion = validarCredencialesLogin(inputUsuario.value, inputContrasena.value);

  if (respuestaValidacion != null) { mensajeError.textContent = respuestaValidacion; } 
  else { mensajeError.textContent = ""; }
});

/* Registro */
btnRegistrarse.addEventListener("click", () => {
  window.location.href = "./register.html";
});