import { createStore } from 'vuex'

import { ArticleStore } from '@/entities/article'
import { AnalyticStore } from '@/entities/analytic'

export default createStore({
  modules: {
    article: ArticleStore,
    analytic: AnalyticStore
  },
})