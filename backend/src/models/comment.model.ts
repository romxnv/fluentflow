import { DataTypes, Sequelize } from "sequelize";
const sequelize = new Sequelize("postgres");

import { Article } from "./article.model.ts";

export const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "article_id",
      references: {
        model: "articles",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "comments",
    timestamps: true,
    underscored: true,
  },
);

Comment.belongsTo(Article, {
  foreignKey: "articleId",
  targetKey: "id",
  as: "article",
});
