import { ZodError } from 'zod';
import {
  CreateArticleDtoSchema,
  type CreateArticleDto,
} from '../dto/create-article.dto.ts';
import {
  UpdateArticleDtoSchema,
  type UpdateArticleDto,
} from '../dto/update-article.dto.ts';
import { Article } from '../models/index.ts';
import { NotFoundError, ValidationError } from '../shared/errors.ts';

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

export default {
  findAll,
  create,
  update,
  remove,
};
