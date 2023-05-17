# Keywords App 
## An application to generate your own questions from your texts.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=uo276406_tfg_app&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=uo276406_tfg_app)


### Tecnologías utilizadas: 🕵️
<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTab05l3ndGtZqyqxgTeOkmB7g2eDGyYrQp60gRu108tIEXOLQTl8tf9Jpx90UiNJEIv1Q&usqp=CAU" height="100">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1200px-Python.svg.png" height="100">
<img src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" height="100">
<img src="https://sonarcloud.io/images/project_badges/sonarcloud-white.svg" href= "https://sonarcloud.io/summary/new_code?id=uo276406_tfg_app" height="100">
</p>


### Guia de inicio rápido para desarrolladores 🤔
 
Para ejecutar el proyecto primero complila y ejecuta la restapi:

```shell
cd restapi
pip install -r requirements.txt
uvicorn.exe main:app --reload
```
a continuación la webapp:
```shell
cd webapp
npm install
npm start
```

Deberias ser capaz de acceder a la webapp en [http://localhost:3000](http://localhost:3000) y la restapi [http://localhost:8000](http://localhost:8000)

### Configuración de variables de entorno ⚙️
La aplicación además utiliza numerosas variables de entorno que hay configurar.

Añadir un fichero denominado ".env" en el directorio "/restapi" con el contenido:
```shell
DATABASE="sqlite+aiosqlite:///development.db"
SECRET="SECRET_KEY"
SECONDS=7200
```
Añadir otro igual denominado ".env" al directorio "/webapp" con el contenido:
```shell
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WEBAPP_URL=http://localhost:3000
REACT_APP_REDOC=http://localhost:8000/redoc
REACT_APP_SWAGGER=http://localhost:8000/docs
```
### Configuración de base de datos en desarrollo 📦
En la fase de desarrollo se ha usado como SGBD SQLite para ello es necesario crear un fichero denominado "development.db" en el directorio restapi (la conexión se indica en el fichero .env anterior).

Una vez se arranca la restapi, las configuración de la base de datos se carga automáticamente, estas tablas se pueden visualizar con diferentes programas de manejo de sistemas de bases de datos para sqlite como [DB Browser for sqlite](https://sqlitebrowser.org/) o extensiones de visual studio.