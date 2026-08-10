import { type NextFunction, type Request, type Response } from 'express';

import articleService from '../services/article.service.ts';
import type { UpdateArticleDto } from '../dto/update-article.dto.ts';
import type { CreateArticleDto } from '../dto/create-article.dto.ts';
import type { CreateCommentDto } from '../dto/create-comment.dto.ts';
import type { UpdateCommentDto } from '../dto/update-comment.dto.ts';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles = await articleService.findAll();
    res.status(200).json({
      data: articles,
    });
  } catch (err) {
    next(err);
  }
};

const create = async (
  req: Request<{}, {}, CreateArticleDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await articleService.create(req.body);
    res.status(201).json({ message: 'Article created successfully' });
  } catch (err) {
    next(err);
  }
};

const update = async (
  req: Request<{ id: string }, {}, UpdateArticleDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await articleService.update(req.params.id, req.body);
    res.status(200).json({ message: 'Article updated successfully' });
  } catch (err) {
    next(err);
  }
};

const remove = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await articleService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const findArticleComments = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const comments = await articleService.findArticleComments(req.params.id);
    res.status(200).json({
      data: comments,
    });
  } catch (err) {
    next(err);
  }
};

const findArticleCommentById = async (
  req: Request<{ id: string; commentId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const comments = await articleService.findArticleCommentById(
      req.params.id,
      req.params.commentId,
    );
    res.status(200).json({
      data: comments,
    });
  } catch (err) {
    next(err);
  }
};

const createComment = async (
  req: Request<{ id: string }, {}, CreateCommentDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await articleService.createComment(req.params.id, req.body);
    res.status(201).json({ message: 'Comment created successfully' });
  } catch (err) {
    next(err);
  }
};

const updateComment = async (
  req: Request<{ id: string; commentId: string }, {}, UpdateCommentDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await articleService.updateComment(
      req.params.id,
      req.params.commentId,
      req.body,
    );
    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (err) {
    next(err);
  }
};

const removeComment = async (
  req: Request<{ id: string; commentId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await articleService.removeComment(req.params.commentId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default {
  findAll,
  create,
  update,
  remove,

  findArticleComments,
  findArticleCommentById,
  createComment,
  updateComment,
  removeComment,
};
