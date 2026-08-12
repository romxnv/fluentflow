import { Op } from 'sequelize';
import { ZodError } from 'zod';

import {
  AnalyticQueryDtoSchema,
  type AnalyticQueryDto,
} from '../dto/analytic-query.dto.ts';
import { Article } from '../models/article.model.ts';
import { Comment } from '../models/comment.model.ts';
import { ValidationError } from '../shared/errors.ts';

type ArticleWithComments = Article & {
  comments: Comment[];
};

const getCommentsAnalytics = async (query: AnalyticQueryDto) => {
  try {
    const { dateFrom, dateTo } = AnalyticQueryDtoSchema.parse(query);

    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);

    if (startDate > endDate) {
      throw new ValidationError('dateFrom must be before dateTo');
    }

    const articlesWithComments = (await Article.findAll({
      include: [
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'message', 'createdAt', 'articleId'],
          where: {
            createdAt: { [Op.between]: [startDate, endDate] },
          },
          required: false,
          order: [['createdAt', 'ASC']],
        },
      ],
      order: [['createdAt', 'DESC']],
    })) as ArticleWithComments[];

    const groups = articlesWithComments
      .map((article) => ({
        article: {
          id: article.getDataValue('id'),
          title: article.getDataValue('title'),
          createdAt: article.getDataValue('createdAt'),
        },
        comments: article.comments.map((comment) => ({
          id: comment.id,
          message: comment.message,
          createdAt: comment.createdAt,
        })),
      }))
      .filter((group) => group.comments.length > 0);

    return {
      period: { dateFrom, dateTo },
      groups,
    };
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.message);
    }
    throw err;
  }
};

export default {
  getCommentsAnalytics,
};
