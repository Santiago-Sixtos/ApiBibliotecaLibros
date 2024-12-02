const express = require('express');
const router = express.Router();
const { getAuthors, saveAuthors } = require('../Models/authorModel');

/**
 * @swagger
 * components:
 *    schemas:
 *       Autor:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             example: 1
 *           name:
 *             type: string
 *             example: "Nombre del Autor"
 *           bio:
 *             type: string
 *             example: "Breve biografía del autor."
 *         example:
 *           id: 1
 *           name: "Nombre del Autor"
 *           bio: "Breve biografía del autor."
 */

/**
 * @swagger
 * tags:
 *   - name: Autor
 *     description: Gestión de autores
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     tags: [Autor]
 *     summary: Consultar todos los autores
 *     responses:
 *       200:
 *         description: Lista de autores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autor'
 */
router.get('/', (req, res) => {
    const authors = getAuthors();
    res.json(authors);
});

/**
 * @swagger
 * /authors:
 *   post:
 *     tags: [Autor]
 *     summary: Añadir un nuevo autor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Autor'
 *             example:
 *               id: 2
 *               name: "Nuevo Autor"
 *               bio: "Biografía del nuevo autor."
 *     responses:
 *       200:
 *         description: Autor añadido
 */
router.post('/', (req, res) => {
    const authors = getAuthors();
    const newAuthor = req.body;
    authors.push(newAuthor);
    saveAuthors(authors);
    res.json(newAuthor);
});

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     tags: [Autor]
 *     summary: Consultar un autor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Detalles del autor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Autor'
 */
router.get('/:id', (req, res) => {
    const authors = getAuthors();
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (author) {
        res.json(author);
    } else {
        res.status(404).send('Autor no encontrado');
    }
});

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     tags: [Autor]
 *     summary: Actualizar un autor por ID
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
 *             $ref: '#/components/schemas/Autor'
 *             example:
 *               id: 1
 *               name: "Nombre Actualizado"
 *               bio: "Biografía actualizada del autor."
 *     responses:
 *       200:
 *         description: Autor actualizado
 */
router.put('/:id', (req, res) => {
    const authors = getAuthors();
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (author) {
        Object.assign(author, req.body);
        saveAuthors(authors);
        res.json(author);
    } else {
        res.status(404).send('Autor no encontrado');
    }
});

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     tags: [Autor]
 *     summary: Eliminar un autor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Autor eliminado
 */
router.delete('/:id', (req, res) => {
    const authors = getAuthors();
    const authorIndex = authors.findIndex(a => a.id === parseInt(req.params.id));
    if (authorIndex !== -1) {
        authors.splice(authorIndex, 1);
        saveAuthors(authors);
        res.send('Autor eliminado');
    } else {
        res.status(404).send('Autor no encontrado');
    }
});

module.exports = router;
