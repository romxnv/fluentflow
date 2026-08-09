import express from 'express';
const router = express.Router();

import articleRouter from './article.router.ts';

router.use('/articles', articleRouter);

export default router;
