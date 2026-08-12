import type { AxiosPromise } from "axios";
import { axiosInstance } from "@/shared/api/axios.instance";

import type { Article, CreateArticleDto } from "../model/types";

export const create = async (dto: CreateArticleDto): AxiosPromise<Article> => {
  return await axiosInstance.post<Article>("/articles", dto);
};
