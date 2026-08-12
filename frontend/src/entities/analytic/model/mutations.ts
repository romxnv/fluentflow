import type { AnalyticsState } from "./types";
import * as types from "./mutation-types";
import type { AnalyticsResponse } from "./types";

export default {
  [types.SET_LOADING](state: AnalyticsState, loading: boolean) {
    state.loading = loading;
  },

  [types.SET_ERROR](state: AnalyticsState, error: string | null) {
    state.error = error;
  },

  [types.SET_ANALYTICS_DATA](state: AnalyticsState, data: AnalyticsResponse) {
    state.data = data;
  },

  [types.CLEAR_ANALYTICS](state: AnalyticsState) {
    state.data = null;
    state.error = null;
  },
};