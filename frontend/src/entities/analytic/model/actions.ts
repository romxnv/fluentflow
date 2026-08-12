import type { ActionContext } from "vuex";

import * as AnalyticsApi from "../api";
import * as types from "./mutation-types";
import type { AnalyticsState } from "./types";
import type { AnalyticsQueryDto } from "./types";

export default {
  async getCommentsAnalytics(
    { commit }: ActionContext<AnalyticsState, {}>,
    params: AnalyticsQueryDto,
  ) {
    commit(types.SET_LOADING, true);
    commit(types.SET_ERROR, null);

    try {
      const response = await AnalyticsApi.getCommentsAnalytics(params);
      commit(types.SET_ANALYTICS_DATA, response.data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      commit(types.SET_ERROR, message);
      throw err;
    } finally {
      commit(types.SET_LOADING, false);
    }
  },

  clearAnalytics({ commit }: ActionContext<AnalyticsState, {}>) {
    commit(types.CLEAR_ANALYTICS);
  },
};
