# Plataforma para Clases (Backend API REST)

Este proyecto consiste en el `Backend para una API REST` ideada con el fin de conectar a profesores y alumnos de distintas actividades deportivas, clases particulares de apoyo escolar, idiomas, cursos, etc.
Está desarrollado en `Node.js` y `Express`, `json web token` para la autenticación, `bcrypt` para la encriptación de contraseñas y `MongoDB` para la base de datos.

Funcionalidades Principales
- Permitir el registro de usuarios (alumnos y profesores)
- Los profesores pueden dar de alta las clases que tienen disponibles (deporte o materia, fecha, hora, y lugar).
- Los alumnos pueden buscar y anotarse o borrarse de las distintas clases disponibles. 

Listado de Endpoints

- Profesores
    - GET: /profesores/
    - POST: /profesores/                            (recibe por body los datos en formato json)
    - POST: /profesores/login                       (recibe por body el email y password en formato json)
    - POST: /profesores/altaClase/[id]              (recibe por body los datos en formato json)

- Alumnos
    - GET: /alumnos/
    - GET: /alumnos/[id]
    - POST: /alumnos/                               (recibe por body los datos en formato json)
    - DELETE: /alumnos/[id]
    - PUT: /alumnos/[id]                            (recibe por body los datos en formato json)
    - POST: /alumnos/login                          (recibe por body el email y password en formato json)
    - POST: /alumnos/anotarseClase/[idAlumno]       (recibe por body el idClase en formato json)
    - POST: /alumnos/cancelarClase/[idAlumno]       (recibe por body el idClase en formato json)

- Clases
    - GET: /clases/
    - GET: /clases/[id]

- Deportes
    - GET: /deportes/
    - POST: /deportes/                              (recibe por body los datos en formato json)

- Materias
    - GET: /materias/
    - POST: /materias/                              (recibe por body los datos en formato json)

Notas:
- La aplicación usa el puerto 3002 (http://localhost:3002)
- Antes de ejecutar el programa, se recomienda ejecutar el comando 'npm install'
- Se puede ejecutar el programa con 'npm run start-dev' para usar nodemon
