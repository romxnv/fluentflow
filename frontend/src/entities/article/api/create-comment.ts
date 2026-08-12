import type { AxiosPromise } from "axios";

import { axiosInstance } from "@/shared/api/axios.instance";
import type { Comment, CreateCommentDto } from "../model/types";

export const createComment = async (
  articleId: string,
  dto: CreateCommentDto,
): AxiosPromise<Comment> => {
  return await axiosInstance.post<Comment>(
    `/articles/${articleId}/comments`,
    dto,
  );
};
