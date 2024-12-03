const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
require('dotenv').config({ path: require('path').resolve(__dirname, '../Direcciones.env') });

const getConnection = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });
};

/**
 * @swagger
 * components:
 *    schemas:
 *       Libro:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             example: 1
 *           title:
 *             type: string
 *             example: "El Título del Libro"
 *           author_id:
 *             type: number
 *             example: 1
 *           genre_id:
 *             type: number
 *             example: 1
 *           published_year:
 *             type: number
 *             example: 2024
 *           description:
 *             type: string
 *             example: "Una breve descripción del libro."
 *         example:
 *           id: 1
 *           title: "El Título del Libro"
 *           author_id: 1
 *           genre_id: 1
 *           published_year: 2024
 *           description: "Una breve descripción del libro."
 */

/**
 * @swagger
 * tags:
 *   - name: Libro
 *     description: Gestión de libros
 */

/**
 * @swagger
 * /books:
 *   get:
 *     tags: [Libro]
 *     summary: Consultar todos los libros
 *     responses:
 *       200:
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Libro'
 */
router.get('/', async (req, res) => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM books');
    await connection.end();
    res.json(rows);
});

/**
 * @swagger
 * /books:
 *   post:
 *     tags: [Libro]
 *     summary: Añadir un nuevo libro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Libro'
 *             example:
 *               id: 2
 *               title: "Nuevo Libro"
 *               author_id: 2
 *               genre_id: 2
 *               published_year: 2025
 *               description: "Descripción del nuevo libro"
 *     responses:
 *       200:
 *         description: Libro añadido
 */
router.post('/', async (req, res) => {
    const connection = await getConnection();
    const { id, title, author_id, genre_id, published_year, description } = req.body;
    await connection.execute('INSERT INTO books (id, title, author_id, genre_id, published_year, description) VALUES (?, ?, ?, ?, ?, ?)', 
    [id, title, author_id, genre_id, published_year, description]);
    await connection.end();
    res.json(req.body);
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags: [Libro]
 *     summary: Consultar un libro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Detalles del libro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 */
router.get('/:id', async (req, res) => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
    await connection.end();
    if (rows.length > 0) {
        res.json(rows[0]);
    } else {
        res.status(404).send('Libro no encontrado');
    }
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     tags: [Libro]
 *     summary: Actualizar un libro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Libro'
 *             example:
 *               id: 1
 *               title: "Título Actualizado"
 *               author_id: 1
 *               genre_id: 1
 *               published_year: 2024
 *               description: "Descripción actualizada del libro"
 *     responses:
 *       200:
 *         description: Libro actualizado
 */
router.put('/:id', async (req, res) => {
    const connection = await getConnection();
    const { title, author_id, genre_id, published_year, description } = req.body;
    await connection.execute('UPDATE books SET title = ?, author_id = ?, genre_id = ?, published_year = ?, description = ? WHERE id = ?', 
    [title, author_id, genre_id, published_year, description, req.params.id]);
    await connection.end();
    res.json(req.body);
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     tags: [Libro]
 *     summary: Eliminar un libro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Libro eliminado
 */
router.delete('/:id', async (req, res) => {
    const connection = await getConnection();
    await connection.execute('DELETE FROM books WHERE id = ?', [req.params.id]);
    await connection.end();
    res.send('Libro eliminado');
});

module.exports = router;
