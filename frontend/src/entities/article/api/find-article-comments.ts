import type { AxiosPromise } from "axios";
import { axiosInstance } from "@/shared/api/axios.instance";
import type { Comment } from "../model/types";

export const findArticleComments = async (
  articleId: string,
): AxiosPromise<Comment[]> => {
  return await axiosInstance.get<Comment[]>(`/articles/${articleId}/comments`);
};
