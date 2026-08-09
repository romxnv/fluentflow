import { Article } from './article.model.js';
import { Comment } from './comment.model.js';

Article.hasMany(Comment, {
  foreignKey: 'articleId',
  as: 'comments',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Article, {
  foreignKey: 'articleId',
  as: 'article',
});

export { Article, Comment };
