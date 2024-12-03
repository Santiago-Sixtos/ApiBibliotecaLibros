require('dotenv').config({ path: path.resolve(__dirname, 'Direcciones.env') });
const express = require('express');
const path = require('path');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bookRoutes = require('./routes/Libros');
const autorRoutes = require('./routes/Autor');
const genreRoutes = require('./routes/Genero');
const port = process.env.PORT || 8082;

const app = express();
app.use(cors());
app.use(express.json()); // Para manejar JSON en las peticiones
const datosReadme = fs.readFileSync(path.join(__dirname,'readme.md'),{ encoding: 'utf8', flag: 'r' });

const connection = await mysql.createConnection({ 
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    port: process.env.DB_PORT 
}); 

connection.connect((err) => { 
    if (err) { console.error('Error conectando a la base de datos:', err.stack); 
        return; 
    } 
    console.log('Conectado a la base de datos como id ' + connection.threadId); 
});

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Biblioteca',
            version: '1.0.0',
            description: datosReadme    
        },
        servers: [
            { url: 'https://apibibliotecalibros-production.up.railway.app' }
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

app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:${port}');
});

// mysql://root:@autorack.proxy.rlwy.net:55180/railway