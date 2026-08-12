import type { AxiosPromise } from "axios";

import { axiosInstance } from "@/shared/api/axios.instance";
import type { Article } from "../model/types";

export const findOne = async (articleId: string): AxiosPromise<Article> => {
  return await axiosInstance.get<Article>(`/articles/${articleId}`);
};
