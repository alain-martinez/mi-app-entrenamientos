# 🏋️‍♂️ mi-app-entrenamientos

Aplicación web cliente-servidor desarrollada con **HTML, CSS y JavaScript puro (Vanilla)** y un **backend ligero** para registrar, consultar y analizar métricas personales de entrenamiento.

## 🎯 Propósito del Proyecto

Además de ser una herramienta útil para llevar el control de mis entrenamientos diarios, este repositorio es un **laboratorio práctico de programación y ciberseguridad**.

El objetivo principal es **cacharrear desde cero con comunicaciones, criptografía y defensa básica** para entender cómo funcionan estas tecnologías por dentro, sin depender de cajas negras ni *frameworks* externos.

**DISCLAIMER: Antes de criticar este proyecto, recalco que es un proyecto 4fun y que no me pagan por ello, es un mero pasatiempos :)**

## 🤖 Filosofía de Desarrollo (Uso de IA)

Este proyecto sigue una regla estricta de aprendizaje activo: **la Inteligencia Artificial se utiliza únicamente como herramienta de consulta conceptual y revisión de arquitectura**, evitando la generación automática de código. Todo el código fuente está depurado y comprendido línea por línea por mí. Aunque, por el bien de mi cabeza, me ayudará con css y con generación de textos cómo este readme :)

## 🛠️ Stack Tecnológico

- **Frontend:** HTML5, CSS3 y JavaScript (ES6+) puro.
- **Backend:** Servidor ligero dedicado a la autenticación, lógica de negocio y persistencia en archivos JSON (`usuarios.json`, `ejercicios.json`, `sesiones.json`).

## 🔐 Laboratorio de Seguridad y Comunicaciones

> **Nota:** En un entorno real de producción se debe utilizar **HTTPS/TLS estándar** y algoritmos probados como *Argon2* o *bcrypt* (*Don't roll your own crypto*). Aquí se implementan de forma artesanal con fines **estrictamente educativos** para comprender su funcionamiento interno.

**Qué estoy implementando para aprender:**

1. **Simulación de canal seguro sobre HTTP:** Implementación propia de cifrado e intercambio de claves en tránsito para entender cómo proteger datos frente a *sniffing* en la red (y documentar por qué sigue siendo vulnerable a ataques *Man-in-the-Middle* sin certificados reales).
2. **Hashing artesanal con *Salt*:** Construcción de una función resumen propia para interiorizar el efecto avalancha y el almacenamiento seguro de contraseñas.
3. **Hardening básico del servidor y cliente:**
   - Validación y saneamiento de entradas en cliente y servidor (prevención de XSS e inyecciones en JSON).
   - Gestión de sesiones segura (cookies `HttpOnly` / `SameSite=Strict`).
   - Protección básica frente a fuerza bruta en el login y control de acceso a los archivos de datos.

## 🚀 Funcionalidades

- [ ] Sistema de login con protocolo de comunicación cifrada propio.
- [ ] Registro de entrenamientos (ejercicio, series, repeticiones, peso y fecha).
- [ ] Historial visual y filtrado por tipo de ejercicio.
- [ ] Persistencia en backend mediante archivos JSON locales.
- [ ] Notas finales de auditoría (probando a romper mi propia app).

## 📂 Documentación del Proyecto

Para priorizar el código sin perder el hilo de las decisiones técnicas, la documentación se mantiene ligera en dos archivos:

- 📄 **[Diario de Desarrollo (`DEVLOG.md`)](DEVLOG.md):** Registro rápido por sesiones con los avances, bloqueos y decisiones tomadas sobre la marcha.
- 🛡️ **[Notas de Diseño y Seguridad (`docs/NOTAS_SEGURIDAD.md`)](docs/NOTAS_SEGURIDAD.md):** Explicación técnica de mi protocolo artesanal, el algoritmo de hash, sus limitaciones conocidas y las pruebas de auditoría.

## 💻 Cómo ejecutar el proyecto

1. Clona este repositorio (`git clone https://github.com/tu-usuario/mi-app-entrenamientos.git`) y entra en la carpeta.
2. Configura las variables de entorno copiando `.env.example` a `.env`.
3. Arranca el servidor backend.
4. Abre `http://localhost:<PUERTO>` en tu navegador.
