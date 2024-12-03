const express = require('express');
const router = express.Router();

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
router.get('/', async (req, res) => {
    const [rows] = await req.db.execute('SELECT * FROM genres');
    res.json(rows);
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
router.post('/', async (req, res) => {
    const { id, name } = req.body;
    await req.db.execute('INSERT INTO genres (id, name) VALUES (?, ?)', [id, name]);
    res.json(req.body);
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
router.get('/:id', async (req, res) => {
    const [rows] = await req.db.execute('SELECT * FROM genres WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
        res.json(rows[0]);
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
router.put('/:id', async (req, res) => {
    const { name } = req.body;
    await req.db.execute('UPDATE genres SET name = ? WHERE id = ?', [name, req.params.id]);
    res.json(req.body);
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
router.delete('/:id', async (req, res) => {
    await req.db.execute('DELETE FROM genres WHERE id = ?', [req.params.id]);
    res.send('Género eliminado');
});

module.exports = router;