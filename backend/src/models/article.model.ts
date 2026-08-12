import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../config/database.ts';

interface ArticleAttributes {
  id: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ArticleCreationAttributes extends Optional<
  ArticleAttributes,
  'id' | 'createdAt' | 'updatedAt'
> {}

export class Article
  extends Model<ArticleAttributes, ArticleCreationAttributes>
  implements ArticleAttributes
{
  public id!: string;
  public title!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Article.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    tableName: 'articles',
    timestamps: true,
    underscored: true,
  },
);
