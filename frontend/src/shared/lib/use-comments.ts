import { computed } from "vue";
import { useStore } from "vuex";

export const useComments = (articleId: string) => {
  const store = useStore();
  const fetch = () => store.dispatch("article/findArticleComments", articleId);
  return {
    comments: computed(() => store.state.article.comments),
    loading: computed(() => store.state.article.loading),
    error: computed(() => store.state.article.error),
    fetch,
    refresh: fetch,
  };
};
