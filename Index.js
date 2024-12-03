const express = require('express');
const path = require('path');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();
const cors = require('cors');
const bookRoutes = require('./routes/Libros');
const autorRoutes = require('./routes/Autor');
const genreRoutes = require('./routes/Genero');
const port = process.env.PORT || 8082;

app.use(cors());
app.use(express.json()); // Para manejar JSON en las peticiones
const datosReadme = fs.readFileSync(path.join(__dirname,'readme.md'),{ encoding: 'utf8', flag: 'r' });

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Biblioteca',
            version: '1.0.0',
            description: datosReadme
        },
        servers: [
            { url: process.env.RAILWAY_PUBLIC_DOMAIN ? process.env.RAILWAY_PUBLIC_DOMAIN : `http://localhost:${port}` }
        ],
    },
    apis: [`${path.join(__dirname, "routes","*.js")}`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Usa las rutas de libros 
app.use('/books', bookRoutes);
// Usa la ruta de autores
app.use('/authors', autorRoutes);
// Usa la ruta de generos
app.use('/genres', genreRoutes);

app.listen(3002, () => {
    console.log('Servidor corriendo en http://localhost: ${port}');
});

// mysql://root:@autorack.proxy.rlwy.net:55180/railway