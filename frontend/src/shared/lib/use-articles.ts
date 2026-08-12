import { computed } from 'vue';
import { useStore } from 'vuex';

export const useArticles = () => {
  const store = useStore();
  return {
    articles: computed(() => store.state.article.items),
    loading: computed(() => store.state.article.loading),
    error: computed(() => store.state.article.error),
    fetchAll: () => store.dispatch('article/findAll'),
  };
}