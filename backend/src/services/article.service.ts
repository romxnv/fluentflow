import { ZodError } from 'zod';

import {
  CreateArticleDtoSchema,
  type CreateArticleDto,
} from '../dto/create-article.dto.ts';
import {
  UpdateArticleDtoSchema,
  type UpdateArticleDto,
} from '../dto/update-article.dto.ts';
import { Article, Comment } from '../models/index.ts';
import { NotFoundError, ValidationError } from '../shared/errors.ts';
import {
  CreateCommentDtoSchema,
  type CreateCommentDto,
} from '../dto/create-comment.dto.ts';
import {
  UpdateCommentDtoSchema,
  type UpdateCommentDto,
} from '../dto/update-comment.dto.ts';

const findAll = async () => {
  return await Article.findAll();
};

const findOne = async (id: string) => {
  const article = await Article.findOne({ where: { id } });
  if (!article) {
    throw new NotFoundError('Article not found');
  }
  return article;
};

const create = async (dto: CreateArticleDto) => {
  try {
    const validated = CreateArticleDtoSchema.parse(dto);
    return await Article.create(validated);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.message);
    }
    throw err;
  }
};

const update = async (id: string, dto: UpdateArticleDto) => {
  try {
    const validated = UpdateArticleDtoSchema.parse(dto);
    const article = await Article.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundError('Article not found');
    }
    return await article.update(validated);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.message);
    }
    throw err;
  }
};

const remove = async (id: string) => {
  const article = await Article.findOne({ where: { id } });
  if (!article) {
    throw new NotFoundError('Article not found');
  }
  return await article.destroy();
};

const findArticleComments = async (articleId: string) => {
  const article = await Article.findOne({ where: { id: articleId } });
  if (!article) {
    throw new NotFoundError('Article not found');
  }
  const comments = await Comment.findAll({
    where: { articleId },
    order: [['createdAt', 'DESC']],
  });
  return comments;
};

const findArticleCommentById = async (articleId: string, commentId: string) => {
  const comment = await Comment.findOne({
    where: { id: commentId, articleId },
  });
  if (!comment) {
    throw new NotFoundError('Comment not found');
  }
  return comment;
};

const createComment = async (articleId: string, dto: CreateCommentDto) => {
  try {
    const validated = CreateCommentDtoSchema.parse(dto);

    const article = await Article.findOne({ where: { id: articleId } });
    if (!article) {
      throw new NotFoundError('Article not found');
    }

    return await Comment.create({
      articleId,
      message: validated.message,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.message);
    }
    throw err;
  }
};

const updateComment = async (
  articleId: string,
  commentId: string,
  dto: UpdateCommentDto,
) => {
  try {
    const validated = UpdateCommentDtoSchema.parse(dto);

    const comment = await Comment.findOne({
      where: { id: commentId, articleId },
    });
    if (!comment) {
      throw new NotFoundError('Comment not found');
    }

    return await comment.update(validated);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.message);
    }
    throw err;
  }
};

const removeComment = async (commentId: string) => {
  const comment = await Comment.findOne({ where: { id: commentId } });
  if (!comment) {
    throw new NotFoundError('Comment not found');
  }
  return await comment.destroy();
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
