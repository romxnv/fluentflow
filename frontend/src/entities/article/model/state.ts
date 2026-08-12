import type { Article, Comment } from "./types";

export interface ArticleState {
  items: Article[];
  currentItem: Article | null;
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

export const state = (): ArticleState => ({
  items: [],
  currentItem: null,
  comments: [],
  loading: false,
  error: null,
});
