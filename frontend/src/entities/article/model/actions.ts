import type { ActionContext } from "vuex";
import * as ArticleApi from "../api";
import * as types from "./mutation-types";
import type { ArticleState } from "./state";
import type {
  CreateArticleDto,
  UpdateArticleDto,
  CreateCommentDto,
  UpdateCommentDto,
} from "./types";

export default {
  // ARTICLES
  async findAll({ commit }: ActionContext<ArticleState, {}>) {
    commit(types.SET_LOADING, true);
    commit(types.SET_ERROR, null);
    try {
      const response = await ArticleApi.findAll();
      commit(types.SET_ARTICLES, { items: response.data });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      commit(types.SET_ERROR, message);
      throw err;
    } finally {
      commit(types.SET_LOADING, false);
    }
  },

  async findOne(
    { commit }: ActionContext<ArticleState, {}>,
    articleId: string,
  ) {
    commit(types.SET_LOADING, true);
    commit(types.SET_ERROR, null);
    try {
      const response = await ArticleApi.findOne(articleId);
      commit(types.SET_CURRENT_ARTICLE, response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      commit(types.SET_ERROR, message);
      throw err;
    } finally {
      commit(types.SET_LOADING, false);
    }
  },

  async create(
    { commit }: ActionContext<ArticleState, {}>,
    dto: CreateArticleDto,
  ) {
    commit(types.SET_LOADING, true);
    commit(types.SET_ERROR, null);
    try {
      const response = await ArticleApi.create(dto);
      commit(types.ADD_ARTICLE, response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      commit(types.SET_ERROR, message);
      throw err;
    } finally {
      commit(types.SET_LOADING, false);
    }
  },

  async update(
    { commit }: ActionContext<ArticleState, {}>,
    { id, dto }: { id: string; dto: UpdateArticleDto },
  ) {
    commit(types.SET_LOADING, true);
    commit(types.SET_ERROR, null);
    try {
      const response = await ArticleApi.update(id, dto);
      commit(types.UPDATE_ARTICLE, response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      commit(types.SET_ERROR, message);
      throw err;
    } finally {
      commit(types.SET_LOADING, false);
    }
  },

  async remove({ commit }: ActionContext<ArticleState, {}>, id: string) {
    commit(types.SET_LOADING, true);
    commit(types.SET_ERROR, null);
    try {
      await ArticleApi.remove(id);
      commit(types.DELETE_ARTICLE, id);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      commit(types.SET_ERROR, message);
      throw err;
    } finally {
      commit(types.SET_LOADING, false);
    }
  },

  // COMMENTS
  async findArticleComments(
    { commit }: ActionContext<ArticleState, {}>,
    articleId: string,
  ) {
    commit(types.SET_LOADING, true);
    commit(types.SET_ERROR, null);
    try {
      const response = await ArticleApi.findArticleComments(articleId);
      commit(types.SET_COMMENTS, response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      commit(types.SET_ERROR, message);
      throw err;
    } finally {
      commit(types.SET_LOADING, false);
    }
  },

  async createComment(
    { commit }: ActionContext<ArticleState, {}>,
    { articleId, dto }: { articleId: string; dto: CreateCommentDto },
  ) {
    commit(types.SET_LOADING, true);
    commit(types.SET_ERROR, null);
    try {
      const response = await ArticleApi.createComment(articleId, dto);
      commit(types.ADD_COMMENT, response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      commit(types.SET_ERROR, message);
      throw err;
    } finally {
      commit(types.SET_LOADING, false);
    }
  },

  async updateComment(
    { commit }: ActionContext<ArticleState, {}>,
    {
      articleId,
      commentId,
      dto,
    }: { articleId: string; commentId: string; dto: UpdateCommentDto },
  ) {
    commit(types.SET_LOADING, true);
    commit(types.SET_ERROR, null);
    try {
      const response = await ArticleApi.updateComment(
        articleId,
        commentId,
        dto,
      );
      commit(types.UPDATE_COMMENT, response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      commit(types.SET_ERROR, message);
      throw err;
    } finally {
      commit(types.SET_LOADING, false);
    }
  },

  async removeComment(
    { commit }: ActionContext<ArticleState, {}>,
    { articleId, commentId }: { articleId: string; commentId: string },
  ) {
    commit(types.SET_LOADING, true);
    commit(types.SET_ERROR, null);
    try {
      await ArticleApi.deleteComment(articleId, commentId);
      commit(types.REMOVE_COMMENT, commentId);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      commit(types.SET_ERROR, message);
      throw err;
    } finally {
      commit(types.SET_LOADING, false);
    }
  },
};
