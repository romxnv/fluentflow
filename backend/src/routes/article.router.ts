import express from 'express';
const router = express.Router();

import articleController from '../controllers/article.controller.ts';

router.get('/', articleController.findAll);
router.post('/', articleController.create);
router.patch('/:id', articleController.update);
router.delete('/:id', articleController.remove);

export default router;
