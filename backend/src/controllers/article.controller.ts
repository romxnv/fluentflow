import { type NextFunction, type Request, type Response } from 'express';

import articleService from '../services/article.service.ts';
import type { UpdateArticleDto } from '../dto/update-article.dto.ts';
import type { CreateArticleDto } from '../dto/create-article.dto.ts';
import type { CreateCommentDto } from '../dto/create-comment.dto.ts';
import type { UpdateCommentDto } from '../dto/update-comment.dto.ts';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles = await articleService.findAll();
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

const findOne = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const article = await articleService.findOne(req.params.id);
    res.status(200).json(article);
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
    const newArticle = await articleService.create(req.body);
    res.status(201).json(newArticle);
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
    const updatedArticle = await articleService.update(req.params.id, req.body);
    res.status(200).json(updatedArticle);
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
    res.status(200).json(comments);
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
    const comment = await articleService.findArticleCommentById(
      req.params.id,
      req.params.commentId,
    );
    res.status(200).json(comment);
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
    const newComment = await articleService.createComment(
      req.params.id,
      req.body,
    );
    res.status(201).json(newComment);
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
    const updatedComment = await articleService.updateComment(
      req.params.id,
      req.params.commentId,
      req.body,
    );
    res.status(200).json(updatedComment);
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
  findOne,
  create,
  update,
  remove,

  findArticleComments,
  findArticleCommentById,
  createComment,
  updateComment,
  removeComment,
};
