import express from 'express';
const router = express.Router();

import articleRouter from './article.router.ts';
import analyticRouter from './analytic.router.ts';

router.use('/articles', articleRouter);
router.use('/analytic', analyticRouter);

export default router;
