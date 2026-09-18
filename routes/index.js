import { Router } from 'express';
import authorsRouter from './authors.routes.js';
import postsRouter from './posts.routes.js';
import commentsRouter from './comments.routes.js';

const router = Router();

router.use('/authors', authorsRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);

export default router;