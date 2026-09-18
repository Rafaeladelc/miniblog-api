import { Router } from 'express';
import * as authorsService from '../services/authors.service.js';

const router = Router();

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Obtener todos los authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: Lista de authors
 */

router.get('/', async (req, res, next) => {
  try {
    const authors = await authorsService.getAllAuthors();
    res.status(200).json(authors);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Obtener un author por id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Author encontrado
 *       404:
 *         description: Author no encontrado
 */

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Crear un nuevo author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author creado
 *       400:
 *         description: Datos inválidos o faltantes
 *       409:
 *         description: El email ya está registrado
 */

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Actualizar un author existente
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Author no encontrado
 *       409:
 *         description: El email ya está registrado
 */

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Eliminar un author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Author eliminado
 *       404:
 *         description: Author no encontrado
 */

router.get('/:id', async (req, res, next) => {
  try {
    const author = await authorsService.getAuthorById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Author no encontrado' });
    }
    res.status(200).json(author);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name y email son obligatorios' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'El email no tiene un formato válido' });
  }

  try {
    const newAuthor = await authorsService.createAuthor({ name, email, bio });
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const { name, email, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name y email son obligatorios' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'El email no tiene un formato válido' });
  }

  try {
    const updatedAuthor = await authorsService.updateAuthor(req.params.id, { name, email, bio });
    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Author no encontrado' });
    }
    res.status(200).json(updatedAuthor);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedAuthor = await authorsService.deleteAuthor(req.params.id);
    if (!deletedAuthor) {
      return res.status(404).json({ error: 'Author no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
