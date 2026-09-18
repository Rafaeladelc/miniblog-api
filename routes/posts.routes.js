import { Router } from 'express';
import * as postsService from '../services/posts.service.js';

const router = Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtener todos los posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts
 */

/**
 * @swagger
 * /posts/author/{authorId}:
 *   get:
 *     summary: Obtener todos los posts de un author específico
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de posts del author (puede estar vacía)
 */

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtener un post por id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post no encontrado
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear un nuevo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author_id
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author_id:
 *                 type: integer
 *               published:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Post creado
 *       400:
 *         description: Datos inválidos o faltantes
 *       409:
 *         description: El author_id no existe
 */

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Actualizar un post existente
 *     tags: [Posts]
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
 *               - title
 *               - content
 *               - author_id
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author_id:
 *                 type: integer
 *               published:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Post actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Post no encontrado
 *       409:
 *         description: El author_id no existe
 */

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Eliminar un post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post eliminado
 *       404:
 *         description: Post no encontrado
 */

router.get('/', async (req, res, next) => {
  try {
    const posts = await postsService.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/author/:authorId', async (req, res, next) => {
  try {
    const posts = await postsService.getPostsByAuthorId(req.params.authorId);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await postsService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { title, content, author_id, published } = req.body;

  if (!title || !content || !author_id) {
    return res.status(400).json({ error: 'title, content y author_id son obligatorios' });
  }

  try {
    const newPost = await postsService.createPost({ title, content, author_id, published });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const { title, content, author_id, published } = req.body;

  if (!title || !content || !author_id) {
    return res.status(400).json({ error: 'title, content y author_id son obligatorios' });
  }

  try {
    const updatedPost = await postsService.updatePost(req.params.id, { title, content, author_id, published });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedPost = await postsService.deletePost(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;