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
router.get('/', async (req, res) => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM authors');
    await connection.end();
    res.json(rows);
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
router.post('/', async (req, res) => {
    const connection = await getConnection();
    const { id, name, bio } = req.body;
    await connection.execute('INSERT INTO authors (id, name, bio) VALUES (?, ?, ?)', [id, name, bio]);
    await connection.end();
    res.json(req.body);
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
router.get('/:id', async (req, res) => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM authors WHERE id = ?', [req.params.id]);
    await connection.end();
    if (rows.length > 0) {
        res.json(rows[0]);
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
router.put('/:id', async (req, res) => {
    const connection = await getConnection();
    const { id, name, bio } = req.body;
    await connection.execute('UPDATE authors SET name = ?, bio = ? WHERE id = ?', [name, bio, req.params.id]);
    await connection.end();
    res.json(req.body);
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
router.delete('/:id', async (req, res) => {
    const connection = await getConnection();
    await connection.execute('DELETE FROM authors WHERE id = ?', [req.params.id]);
    await connection.end();
    res.send('Autor eliminado');
});

module.exports = router;
