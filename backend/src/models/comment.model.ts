import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../config/database.ts';

interface CommentAttributes {
  id: string;
  message: string;
  articleId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CommentCreationAttributes extends Optional<
  CommentAttributes,
  'id' | 'createdAt' | 'updatedAt'
> {}

export class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: string;
  public message!: string;
  public articleId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'article_id',
      references: {
        model: 'articles',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
    tableName: 'comments',
    timestamps: true,
    underscored: true,
  },
);
