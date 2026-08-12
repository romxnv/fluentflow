import type { MutationTree } from "vuex";
import type { ArticleState } from "./state";
import type { Article, Comment } from "./types";
import * as types from "./mutation-types";

export const mutations: MutationTree<ArticleState> = {
  // ARTICLES
  [types.SET_ARTICLES](state, payload: { items: Article[] }) {
    state.items = payload.items;
  },
  [types.SET_CURRENT_ARTICLE](state, article: Article | null) {
    state.currentItem = article;
  },
  [types.ADD_ARTICLE](state, article: Article) {
    state.items.unshift(article);
  },
  [types.UPDATE_ARTICLE](state, article: Article) {
    const idx = state.items.findIndex((a) => a.id === article.id);
    if (idx !== -1) state.items[idx] = article;
    if (state.currentItem?.id === article.id) state.currentItem = article;
  },
  [types.DELETE_ARTICLE](state, id: string) {
    state.items = state.items.filter((a) => a.id !== id);
    if (state.currentItem?.id === id) state.currentItem = null;
  },

  // COMMENTS
  [types.SET_COMMENTS](state, comments: Comment[]) {
    state.comments = comments;
  },
  [types.ADD_COMMENT](state, comment: Comment) {
    state.comments.push(comment);
  },
  [types.UPDATE_COMMENT](state, comment: Comment) {
    const idx = state.comments.findIndex((c) => c.id === comment.id);
    if (idx !== -1) state.comments[idx] = comment;
  },
  [types.REMOVE_COMMENT](state, commentId: string) {
    state.comments = state.comments.filter((c) => c.id !== commentId);
  },

  // COMMON
  [types.SET_LOADING](state, status: boolean) {
    state.loading = status;
  },
  [types.SET_ERROR](state, error: string | null) {
    state.error = error;
  },
};
