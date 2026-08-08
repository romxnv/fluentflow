import { DataTypes, Sequelize } from "sequelize";
import { Comment } from "./comment.model.js";
const sequelize = new Sequelize("postgres");

export const Article = sequelize.define(
  "Article",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "articles",
    timestamps: true,
    underscored: true,
  },
);

Article.hasMany(Comment, {
  foreignKey: "articleId",
  sourceKey: "id",
  as: "comments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
