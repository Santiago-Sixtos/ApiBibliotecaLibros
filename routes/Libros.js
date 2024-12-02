const express = require('express');
const router = express.Router();
const { getBooks, saveBooks } = require('../models/bookModel'); // Importa las funciones para manejar los libros

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
router.get('/', (req, res) => {
    const books = getBooks();
    res.json(books);
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
router.post('/', (req, res) => {
    const books = getBooks();
    const newBook = req.body;
    books.push(newBook);
    saveBooks(books);
    res.json(newBook);
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
router.get('/:id', (req, res) => {
    const books = getBooks();
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.json(book);
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
router.put('/:id', (req, res) => {
    const books = getBooks();
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        Object.assign(book, req.body);
        saveBooks(books);
        res.json(book);
    } else {
        res.status(404).send('Libro no encontrado');
    }
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
router.delete('/:id', (req, res) => {
    const books = getBooks();
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        saveBooks(books);
        res.send('Libro eliminado');
    } else {
        res.status(404).send('Libro no encontrado');
    }
});

module.exports = router;
