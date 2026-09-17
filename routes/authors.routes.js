import { Router } from 'express';
import * as authorsService from '../services/authors.service.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const authors = await authorsService.getAllAuthors();
    res.status(200).json(authors);
  } catch (err) {
    next(err);
  }
});

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
