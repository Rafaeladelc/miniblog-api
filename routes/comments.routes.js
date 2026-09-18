import { Router } from 'express';
import * as commentsService from '../services/comments.service.js';

const router = Router();

/**
 * @swagger
 * /comments/post/{postId}:
 *   get:
 *     summary: Obtener todos los comentarios de un post específico
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de comentarios del post (puede estar vacía)
 */
router.get('/post/:postId', async (req, res, next) => {
  try {
    const comments = await commentsService.getCommentsByPostId(req.params.postId);
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - post_id
 *               - author_id
 *             properties:
 *               content:
 *                 type: string
 *               post_id:
 *                 type: integer
 *               author_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comentario creado
 *       400:
 *         description: Datos inválidos o faltantes
 *       409:
 *         description: El post_id o author_id no existe
 */
router.post('/', async (req, res, next) => {
  const { content, post_id, author_id } = req.body;

  if (!content || !post_id || !author_id) {
    return res.status(400).json({ error: 'content, post_id y author_id son obligatorios' });
  }

  try {
    const newComment = await commentsService.createComment({ content, post_id, author_id });
    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
});

export default router;