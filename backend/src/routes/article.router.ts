import express from 'express';
const router = express.Router();

import articleController from '../controllers/article.controller.ts';

router.get('/', articleController.findAll);
router.post('/', articleController.create);
router.patch('/:id', articleController.update);
router.delete('/:id', articleController.remove);

router.get('/:id/comments', articleController.findArticleComments);
router.get(
  '/:id/comments/:commentId',
  articleController.findArticleCommentById,
);
router.post('/:id/comments', articleController.createComment);
router.patch('/:id/comments/:commentId', articleController.updateComment);
router.delete('/:id/comments/:commentId', articleController.removeComment);

export default router;
