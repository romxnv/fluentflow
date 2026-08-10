import { Op } from 'sequelize';

import {
  AnalyticQueryDtoSchema,
  type AnalyticQueryDto,
} from '../dto/analytic-query.dto.ts';
import { Article } from '../models/article.model.ts';
import { Comment } from '../models/comment.model.ts';

const getCommentsAnalytics = async (query: AnalyticQueryDto) => {
  const { dateFrom, dateTo } = AnalyticQueryDtoSchema.parse(query);

  if (new Date(dateFrom) > new Date(dateTo)) {
    throw new Error('dateFrom must be before dateTo');
  }

  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);

  const articlesWithComments = await Article.findAll({
    include: [
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'message', 'createdAt', 'articleId'],
        where: { createdAt: { [Op.between]: [startDate, endDate] } },
        required: false,
        separate: true,
        order: [['createdAt', 'ASC']],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  const groups = articlesWithComments
    .map((article) => ({
      article: {
        id: article.getDataValue('id'),
        title: article.getDataValue('title'),
        createdAt: article.getDataValue('createdAt'),
      },
      comments: article.toJSON().comments.map((comment: any) => ({
        id: comment.id,
        message: comment.message,
        createdAt: comment.createdAt,
      })),
    }))
    .filter((group) => group.comments.length > 0);

  return { period: { dateFrom, dateTo }, groups };
};

export default {
  getCommentsAnalytics,
};
