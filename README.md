# stock-flow
Project | Software Development III

## Table

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


## Cómo ejecutar la aplicación

### Requisitos

  - [NodeJS](https://nodejs.org/en)

### Clona el repositorio

```
git clone https://github.com/dilanrojas/stock-flow
cd stock-flow
```

### Instalar dependencias

```
npm install
```

### Iniciar el proyecto

```bash
npm run dev
```

### Navegación entre páginas

#### useNavigate (hook de react)

useNavigate se utiliza cuando la navegación depende de lógica (login, validación).

```jsx
import { useNavigate } from "react-router-dom";

export default function UsageExample() {
  const navigate = useNavigate();

  const handleClick = () => {
    if (condition) {
      navigate("/home"); // redirect
    } else {
      alert("Condition not met");
    }
  };

  return (
    <h1>Page content</h1>
  )
}
```

#### Link component

Link se utiliza para navegación del usuario (menú, botones, navbar).

```jsx
import { Link } from 'react-router-dom';

export default function UsageExample() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/petlist'>Mascotas</Link> // redirects to /petlist page as defined inside <Routes />
            <Link to='/clientprofile'>Mi perfil</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
```

### Comandos Git necesarios

#### Cambiar a tu branch

```git
git checkout feature/nombre
```

#### Guardar cambios y hacer commit

```git
git add . # '.' añade todos los cambios. Mas específico --> git add ./src/App.css
git commit -m "Describe los cambios"
```

#### Hacer "push" de los cambios

```git
git push origin feature/nombre
```

#### Estar al día con la rama main

```git
git checkout main
git pull origin main
git checkout feature/nombre
git merge main
git push --force
```
