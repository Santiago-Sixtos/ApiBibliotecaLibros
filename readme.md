## Descripción

Una API para gestionar una biblioteca de libros. Proporciona endpoints para añadir, consultar, actualizar y eliminar libros. Ideal para desarrolladores que necesiten una API sencilla y rápida para gestionar datos de libros.

## Autor

- [@Santiago-Sixtos](https://github.com/Santiago-Sixtos)

## Herramientas utilizadas

**Server:** Node, Express, Swagger, CORS

## Uso/Ejemplos

A continuación, se muestra un ejemplo de cómo consumir la API utilizando Thunder Client en Visual Studio Code:

### Obtener Todos los Libros

**Método:** GET  
**URL:** `http://localhost:3002/books`

**Ejemplo de Respuesta:**
```json
[
  {
    "id": 1,
    "title": "El Título del Libro",
    "author_id": 1,
    "genre_id": 1,
    "published_year": 2024,
    "description": "Una breve descripción del libro."
  }
]

