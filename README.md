# Individual Project - Henry Food

Este es un proyecto individial que está hecho sólo con React, Redux, Node.js, y sequelize(PostgreSQL) y trabaja con la API(Applicacion Page Interface) [spoonacular](https://spoonacular.com/food-api).
Esta pagina cuenta con las siguentes funcionalidades sin llegar a ser CRUD(Create Read Update Delete), todavía.

### Funcionalidades del Proyecto

- Buscar recetas
- **Filtrardas** por dietas y **Ordenadas** alfabéticamente y por máxima y mínima puntuación de salud
- Crear recetas propias
- Resetear las búsquedas y filtrados
- Paginado acorde a la cantidad de recetas encontradas en el caso de búsqueda

## Requisitos de versiones

- **Node**: 12.18.3 o mayor
- **NPM**: 6.14.16 o mayor
  Para verificar que versión tienen instalada:
  > node -v
  >
  > npm -v

## BoilerPlate

El proyecto cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada `food`

El contenido de `client` fue creado usando: Create React App.

## Instrucciones

Si se fijan al entrar a api/src/controllers/index.js están comentados los llamados a la api por problemas de los servicios en la actualidad, para que se logren ver todos los datos y solicitar información sin límite. A continuación de paso a paso voy a indicarles para que tengan la mejor experiencia con la api

1. Forkear el repositorio para tener una copia del mismo en sus cuentas.
2. Clonar el repositorio en sus computadoras para comenzar a trabajar.
3. Para utilizar la api deben entrar al archivo en api/src/Controllers/index.js y Comentar las líneas **12** y **53** y Descomentar las líneas **8** y **51**.
4. Como está comentado en el mismo archivo hay que agregar en la variable api el **.data** por como funciona axios y también agregar el await antes del valor de en la variable PETICIONES.
5. Entrar a la carpeta api/ y en la consola hacer npm install para instalar las dependencias necesarias para este proyecto y luego en la carpeta client/ repetir el proceso.
6. Luego abrir 2 pestañas de la consola para que en la primera, luego del paso anterior, tienen que colocarse en la carpeta api/ y hacer npm start y esperar hasta que les salga el mensaje de `"%s listening at 3001"` y en la segunda pestaña ir a la carpeta client/ habiendo hecho el npm install y hacer el npm start y debería llevarte al `http://localhost:3000`

**IMPORTANTE**: Para poder utilizar esta API externa es necesario crearse una cuenta para obtener una API Key que luego deberá ser incluida en todos los request que hagan a spoonacular simplemente agregando `?apiKey={YOUR_API_KEY}` al final de cada endpoint(ver este dato en la página oficial de [spoonacular](https://spoonacular.com/food-api)). Agregar la clave en el archivo `.env`(creado en la carpeta **api**) para que la misma no se suba al repositorio por cuestiones de seguridad y utilizarla desde allí. Por otro lado tienen un límite de requests por día por lo que usenlos con cuidado o dejen comentado como hice yo.
