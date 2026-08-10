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
import { sequelize } from '../config/database.ts';

const findAll = async () => {
  return await Article.findAll();
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

const findArticleComments = async (id: string) => {
  const article = await Article.findOne({ where: { id } });
  if (!article) {
    throw new NotFoundError('Article not found');
  }
  const comments = await Comment.findAll({
    where: {
      articleId: id,
    },
    order: [['createdAt', 'DESC']],
  });

  return comments;
};

const findArticleCommentById = async (id: string, commentId: string) => {
  const article = await Article.findOne({ where: { id } });
  if (!article) {
    throw new NotFoundError('Article not found');
  }

  const comment = await Comment.findOne({
    where: {
      id: commentId,
      articleId: id,
    },
  });
  if (!comment) {
    throw new NotFoundError('Comment not found');
  }

  return comment;
};

const createComment = async (id: string, dto: CreateCommentDto) => {
  try {
    const validated = CreateCommentDtoSchema.parse(dto);

    const result = await sequelize.transaction(async (t) => {
      const article = await Article.findOne({
        where: { id },
        transaction: t,
      });

      if (!article) {
        throw new NotFoundError('Article not found');
      }

      return await Comment.create(
        {
          articleId: id,
          message: validated.message,
        },
        { transaction: t },
      );
    });

    return result;
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.message);
    }
    throw err;
  }
};

const updateComment = async (
  id: string,
  commentId: string,
  dto: UpdateCommentDto,
) => {
  try {
    const validated = UpdateCommentDtoSchema.parse(dto);

    const result = await sequelize.transaction(async (t) => {
      const article = await Article.findOne({
        where: { id },
        transaction: t,
      });
      if (!article) {
        throw new NotFoundError('Article not found');
      }

      const comment = await Comment.findOne({
        where: {
          id: commentId,
          articleId: id,
        },
        transaction: t,
      });
      if (!comment) {
        throw new NotFoundError('Comment not found');
      }

      return await comment.update(validated, { transaction: t });
    });

    return result;
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
  create,
  update,
  remove,

  findArticleComments,
  findArticleCommentById,
  createComment,
  updateComment,
  removeComment,
};
