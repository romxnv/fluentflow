import type { AxiosPromise } from "axios";

import { axiosInstance } from "@/shared/api/axios.instance";

export const remove = async (articleId: string): AxiosPromise<void> => {
  return await axiosInstance.delete(`/articles/${articleId}`);
};
