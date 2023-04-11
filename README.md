# Keywords App 
## An application to generate your own questions from your texts.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=uo276406_tfg_app&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=uo276406_tfg_app)

### Tecnologías utilizadas: 🕵️
<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTab05l3ndGtZqyqxgTeOkmB7g2eDGyYrQp60gRu108tIEXOLQTl8tf9Jpx90UiNJEIv1Q&usqp=CAU" height="100">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1200px-Python.svg.png" height="100">
<img src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" height="100">
</p>

### Guia de inicio rápido 🤔
 
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