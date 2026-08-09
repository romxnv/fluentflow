import { type NextFunction, type Request, type Response } from 'express';

import articleService from '../services/article.service.ts';
import type { UpdateArticleDto } from '../dto/update-article.dto.ts';
import type { CreateArticleDto } from '../dto/create-article.dto.ts';

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

export default {
  findAll,
  create,
  update,
  remove,
};
