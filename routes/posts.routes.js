import { Router } from 'express';
import * as postsService from '../services/posts.service.js';

const router = Router();

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