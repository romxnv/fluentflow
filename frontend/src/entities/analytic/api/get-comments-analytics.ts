import { axiosInstance } from "@/shared/api/axios.instance";
import type { AnalyticsQueryDto, AnalyticsResponse } from "../model/types";

export const getCommentsAnalytics = (params: AnalyticsQueryDto) => {
  return axiosInstance.get<AnalyticsResponse>("/analytic/comments", {
    params,
  });
};
