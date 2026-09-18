import { Router } from 'express';
import authorsRouter from './authors.routes.js';
import postsRouter from './posts.routes.js';
import commentsRouter from './comments.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'MiniBlog API - Proyecto Integrador 2, SoyHenry',
    documentacion: '/api-docs',
    endpoints: ['/authors', '/posts', '/comments'],
  });
});

router.use('/authors', authorsRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);

export default router;