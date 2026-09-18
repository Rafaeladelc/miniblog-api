# MiniBlog API

API REST para la gestión de un blog simple, desarrollada para DevSpark. Permite administrar autores (`authors`) y publicaciones (`posts`), con relación uno a muchos entre ambos, y una entidad adicional de comentarios (`comments`) como extra credit.

Proyecto Integrador 2 — Módulo 2 Backend, SoyHenry.

## Autor

Rafaela Martínez — rafaelaperu2018@gmail.com — [GitHub](https://github.com/Rafaeladelc)

## Tecnologías

- Node.js + Express
- PostgreSQL (driver `pg`, sin ORM)
- Vitest + Supertest (testing)
- Swagger (`swagger-jsdoc` + `swagger-ui-express`)
- Railway (deployment)

## Estructura del proyecto
```
miniblog-api/
├── app.js # Configuración de Express
├── server.js # Arranque del servidor
├── swagger.js # Configuración de OpenAPI
├── db/
│ ├── config.js # Conexión a PostgreSQL
│ └── init.sql # Script de setup + seed
├── routes/ # Endpoints HTTP
├── services/ # Lógica de negocio y SQL
├── middlewares/
│ └── errorHandler.js # Manejo centralizado de errores
└── tests/ # Tests automatizados
```

## Instalación y ejecución local

**1. Cloná el repositorio:**
```bash
git clone https://github.com/Rafaeladelc/miniblog-api.git
cd miniblog-api
```

**2. Instalá las dependencias:**
```bash
npm install
```

**3. Creá la base de datos en PostgreSQL:**
```bash
psql -U postgres -c "CREATE DATABASE miniblog_db;"
psql -U postgres -d miniblog_db -f db/init.sql
```

**4. Configurá las variables de entorno:**

Copiá `.env.example` y renombralo a `.env`:
```powershell
Copy-Item .env.example .env
```
Completá el archivo con tus datos reales de PostgreSQL:
```
PORT=3000
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog_db
```


**5. Levantá el servidor:**
```bash
npm start
```
La API queda disponible en `http://localhost:3000`.

## Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| GET | /authors | Listar authors |
| GET | /authors/:id | Obtener un author |
| POST | /authors | Crear author |
| PUT | /authors/:id | Actualizar author |
| DELETE | /authors/:id | Eliminar author |
| GET | /posts | Listar posts |
| GET | /posts/:id | Obtener un post |
| GET | /posts/author/:authorId | Posts de un author específico |
| POST | /posts | Crear post |
| PUT | /posts/:id | Actualizar post |
| DELETE | /posts/:id | Eliminar post |
| GET | /comments/post/:postId | Comentarios de un post (extra credit) |
| POST | /comments | Crear comentario (extra credit) |

Documentación interactiva completa: ver sección Swagger más abajo.

## Tests

Corridos con Vitest + Supertest, contra la base de datos local:
```bash
npm test
```
14 tests automatizados en total (6 sobre `authors`, 8 sobre `posts`), cubriendo casos exitosos (200, 201, 204) y casos de error (400, 404, 409).

## Documentación OpenAPI (Swagger)

Con el servidor corriendo, la documentación interactiva está disponible en:
- Local: `http://localhost:3000/api-docs`
- Producción: `https://miniblog-api-production-c382.up.railway.app/api-docs`

Permite probar cada endpoint directamente desde el navegador, sin necesidad de Postman.

## Deployment en Railway

1. Se creó un proyecto en Railway con dos servicios: la aplicación (conectada al repositorio de GitHub) y una base de datos PostgreSQL.
2. La variable `DATABASE_URL` se conectó por referencia (`${{Postgres.DATABASE_URL}}`), sin copiar credenciales manualmente.
3. `db/config.js` detecta automáticamente si existe `DATABASE_URL`: si existe, se conecta a Railway; si no, usa las variables sueltas del `.env` local.
4. El script `db/init.sql` se ejecutó manualmente contra la base de datos de Railway, usando el editor de consultas integrado.
5. Se generó un dominio público desde la sección Networking del servicio.

## URL pública

**API en producción:** https://miniblog-api-production-c382.up.railway.app

**Repositorio:** https://github.com/Rafaeladelc/miniblog-api

## Uso de IA en el proyecto

Se utilizó Claude (Anthropic) como asistente durante todo el desarrollo, con un enfoque de guía paso a paso: cada bloque de código se explicaba, se escribía, y se probaba (en terminal o Postman) antes de avanzar al siguiente, en vez de generar el proyecto completo de una vez.

Principales áreas donde se usó la IA:
- Explicación de conceptos (capas de arquitectura, parametrización SQL, middlewares de error, diferencias entre `authors.routes.js` y `services`) con analogías y ejemplos conectados a proyectos anteriores del bootcamp (`animales-api`, `books-api`).
- Diagnóstico de errores reales durante el desarrollo: problemas de encoding UTF-8 al insertar datos con tildes, un proceso de Node "zombie" ocupando el puerto 3000, duplicación accidental de bloques de código, y errores de sintaxis JSON en Postman.
- Verificación de requisitos contra la consigna y la rúbrica del proyecto antes de tomar decisiones de diseño (por ejemplo, confirmar con la rúbrica y con el profesor si el código HTTP 409 era apropiado para errores de restricción de base de datos).
- Guía en el proceso de deployment en Railway, incluyendo la resolución de un límite de recursos del plan gratuito y la corrección de proyectos duplicados creados por error.
- Redacción de este README y de la documentación Swagger.

Todas las decisiones de arquitectura y las validaciones de la consigna fueron revisadas manualmente antes de aplicarse.