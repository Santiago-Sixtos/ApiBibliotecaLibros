const express = require('express');
const router = express.Router();
const { getGenres, saveGenres } = require('../Models/genreModel');

/**
 * @swagger
 * components:
 *    schemas:
 *       Género:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             example: 1
 *           name:
 *             type: string
 *             example: "Nombre del Género"
 *         example:
 *           id: 1
 *           name: "Nombre del Género"
 */

/**
 * @swagger
 * tags:
 *   - name: Género
 *     description: Gestión de géneros
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     tags: [Género]
 *     summary: Consultar todos los géneros
 *     responses:
 *       200:
 *         description: Lista de géneros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Género'
 */
router.get('/', (req, res) => {
    const genres = getGenres();
    res.json(genres);
});

/**
 * @swagger
 * /genres:
 *   post:
 *     tags: [Género]
 *     summary: Añadir un nuevo género
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Género'
 *             example:
 *               id: 2
 *               name: "Nuevo Género"
 *     responses:
 *       200:
 *         description: Género añadido
 */
router.post('/', (req, res) => {
    const genres = getGenres();
    const newGenre = req.body;
    genres.push(newGenre);
    saveGenres(genres);
    res.json(newGenre);
});

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     tags: [Género]
 *     summary: Consultar un género por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Detalles del género
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Género'
 */
router.get('/:id', (req, res) => {
    const genres = getGenres();
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (genre) {
        res.json(genre);
    } else {
        res.status(404).send('Género no encontrado');
    }
});

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     tags: [Género]
 *     summary: Actualizar un género por ID
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
 *             $ref: '#/components/schemas/Género'
 *             example:
 *               id: 1
 *               name: "Nombre Actualizado del Género"
 *     responses:
 *       200:
 *         description: Género actualizado
 */
router.put('/:id', (req, res) => {
    const genres = getGenres();
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (genre) {
        Object.assign(genre, req.body);
        saveGenres(genres);
        res.json(genre);
    } else {
        res.status(404).send('Género no encontrado');
    }
});

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     tags: [Género]
 *     summary: Eliminar un género por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Género eliminado
 */
router.delete('/:id', (req, res) => {
    const genres = getGenres();
    const genreIndex = genres.findIndex(g => g.id === parseInt(req.params.id));
    if (genreIndex !== -1) {
        genres.splice(genreIndex, 1);
        saveGenres(genres);
        res.send('Género eliminado');
    } else {
        res.status(404).send('Género no encontrado');
    }
});

module.exports = router;
