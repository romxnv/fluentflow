// ARTICLES
export interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
export type CreateArticleDto = {
  title: string;
  content: string;
};
export type UpdateArticleDto = Partial<CreateArticleDto>;

// COMMENTS
export interface Comment {
  id: string;
  message: string;
  articleId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
export type CreateCommentDto = Pick<Comment, "message">;
export type UpdateCommentDto = Partial<CreateCommentDto>;
