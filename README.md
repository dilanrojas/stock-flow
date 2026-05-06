# stock-flow
Project | Software Development III

## Story points

| Historia     | Descripción                       | Story Points | Justificación                                                          |
| ------------ | --------------------------------- | ------------ | ---------------------------------------------------------------------- |
| **SCRUM-12** | Configurar BD (Docker + conexión) | **5**        | No es trivial (Docker + config), pero se hace una sola vez             |
| **SCRUM-1**  | Agregar productos                 | **8**        | Primera funcionalidad completa (DB + backend + frontend + integración) |
| **SCRUM-5**  | Listar productos                  | **5**        | Más simple que crear, pero incluye UI + consumo API                    |
| **SCRUM-3**  | Editar producto                   | **5**        | Similar a crear, pero reutiliza bastante                               |
| **SCRUM-4**  | Eliminar producto                 | **3**        | Lógica simple, menor complejidad                                       |
| **SCRUM-6**  | Categorías                        | **5**        | CRUD completo pero más simple que productos                            |
| **SCRUM-8**  | Proveedores                       | **5**        | Similar a categorías                                                   |
| **SCRUM-10** | Login                             | **8**        | Seguridad + lógica + frontend (riesgo alto si no lo dominan)           |
| **SCRUM-9**  | Diseño UI                         | **3**        | Más visual que técnico                                                 |
| **SCRUM-11** | Dashboard                         | **5**        | Depende de varias partes, pero no es muy complejo                      |

## Subtasks table

| Historia                      | Dilan                                        | Esteban                                 | Valentina                         | Amanda                         |
| ----------------------------- | -------------------------------------------- | --------------------------------------- | --------------------------------- | ------------------------------ |
| **SCRUM-12** Configurar BD    | Configurar conexión Spring Boot (datasource) | Docker MySQL + docker-compose + init DB | Documentar variables de conexión  | Probar conexión app ↔ DB       |
| **SCRUM-1** Agregar productos | Integrar frontend ↔ backend + manejo errores | Crear tabla `products` + relaciones     | Crear endpoint POST + lógica      | Formulario UI crear producto   |
| **SCRUM-5** Listar productos  | Crear UI listado productos                   | Endpoint GET /products                  | Integrar datos en UI              | Revisar datos y queries        |
| **SCRUM-3** Editar producto   | Integrar API + carga de datos                | Ajustes/validaciones DB                 | Crear endpoint PUT + lógica       | Formulario edición producto    |
| **SCRUM-4** Eliminar producto | Endpoint DELETE + lógica                     | Constraints y validaciones DB           | Botón eliminar + confirmación     | Actualizar lista en UI         |
| **SCRUM-6** Categorías        | CRUD backend categorías                      | Crear tabla `categories`                | UI categorías                     | Integrar dropdown en productos |
| **SCRUM-8** Proveedores       | UI proveedores                               | CRUD backend proveedores                | Integrar proveedores en productos | Crear tabla `suppliers`        |
| **SCRUM-10** Login            | Integración login (manejo sesión/token)      | UI login                                | Backend login + seguridad         | Tabla `users`                  |
| **SCRUM-9** Diseño UI         | Ajustes backend (CORS si necesario)          | Apoyo general UI                        | Layout general                    | Estilos + UX                   |
| **SCRUM-11** Dashboard        | Endpoint estadísticas                        | Queries de datos                        | Integración datos en UI           | Vista dashboard                |
