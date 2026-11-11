# 🏋️‍♂️ mi-app-entrenamientos

Aplicación web cliente desarrollada con **HTML, CSS y JavaScript puro (Vanilla)**, diseñada para el uso personal y con fines estrictamente educativos. 
La app tiene backend montado, únicamente para la recepción de los datos de usuario y posterior guardado en JSON. 

## 🎯 Propósito del proyecto
El objetivo principal es construir una herramienta propia para registrar y hacer seguimiento de mis entrenamientos diarios. A través de este desarrollo busco consolidar los fundamentos de la programación web (estructura del DOM, estilos y lógica en el cliente).

## 🤖 Filosofía de desarrollo (Uso de IA)
Este proyecto sigue una regla de aprendizaje activo: **la Inteligencia Artificial se utiliza únicamente como herramienta de consulta conceptual y resolución de dudas**, evitando la generación automática de código. Todo el código fuente está escrito y comprendido línea por línea por mí. Cabe aclarar que para documentaciones y/o textos si que me va a ayudar como con este README :)

## 🛠️ Tecnologías utilizadas
* **HTML5:** Estructura semántica de la aplicación.
* **CSS3:** Diseño, maquetación y estilos visuales.
* **JavaScript (ES6+):** Lógica de negocio, manipulación del DOM y gestión de datos en el navegador.

## 🚀 Funcionalidades previstas
* [ ] Formulario para registrar nuevos entrenamientos (ejercicio, series, repeticiones, peso y fecha).
* [ ] Historial visual de sesiones anteriores.
* [ ] Persistencia de datos en el servidor.
* [ ] Filtrado o búsqueda básica por tipo de ejercicio.

## 🔐 Enfoque y perfil del autor
Soy estudiante de ingeniería con interés en especializarme en **ciberseguridad**. Aunque esta es una aplicación sencilla ejecutada en el lado del cliente, el desarrollo se aborda prestando atención a buenas prácticas desde la base:
* Validación y saneamiento básico de las entradas del usuario (prevención conceptual frente a inyecciones como XSS en el DOM).
* Código limpio, modular y legible.

## ⚙️ Decisiones de arquitectura y desarrollo

### ¿Por qué implementar un backend ligero para persistencia en JSON?

Aunque la idea inicial era desarrollar una aplicación **100 % *client-side***, finalmente se optó por incorporar un pequeño servidor backend dedicado exclusivamente a gestionar la lectura y escritura de datos en un archivo `.json` local. 

Si bien el navegador permite escribir archivos directamente en el disco duro desde el cliente (mediante APIs como *File System Access*), este enfoque añade fricción innecesaria por las restricciones de seguridad y la gestión constante de permisos de escritura con el usuario. Delegar esta tarea a un backend ligero resuelve el problema y aporta las siguientes ventajas:

* **Persistencia real y sin volatilidad:** Evita las limitaciones y la fragilidad de `localStorage`, cuyos datos pueden perderse al limpiar la caché del navegador o quedar atrapados en un único entorno.
* **Escritura transparente en disco:** Permite guardar cambios automáticamente en segundo plano sin interrumpir el flujo de uso con cuadros de diálogo de permisos o descargas repetidas.
* **Portabilidad y control total:** Almacenar la información directamente en el sistema de archivos del PC facilita crear copias de seguridad, migrar los datos a otros equipos o editarlos manualmente de forma sencilla.
* **Simplicidad frente a motores pesados:** Usar un archivo JSON como almacenamiento local ofrece la seguridad de guardar en disco sin la complejidad de configurar e instalar una base de datos tradicional (como MySQL o PostgreSQL).

## 💻 Cómo ejecutar el proyecto
Al ser una aplicación web estática sin dependencias externas, no requiere instalación:
1. Clona o descarga este repositorio.
2. Abre el archivo `index.html` directamente en cualquier navegador web moderno.
