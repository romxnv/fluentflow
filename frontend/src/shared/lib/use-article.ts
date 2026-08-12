import { computed } from "vue";
import { useStore } from "vuex";

export const useArticle = (articleId: string) => {
  const store = useStore();
  return {
    article: computed(() => store.state.article.currentItem),
    loading: computed(() => store.state.article.loading),
    error: computed(() => store.state.article.error),
    fetch: () => store.dispatch("article/findOne", articleId),
  };
};
