import type { AxiosPromise } from "axios";

import { axiosInstance } from "@/shared/api/axios.instance";
import type { Article, UpdateArticleDto } from "../model/types";

export const update = async (
  articleId: string,
  dto: UpdateArticleDto,
): AxiosPromise<Article> => {
  return await axiosInstance.patch<Article>(`/articles/${articleId}`, dto);
};
