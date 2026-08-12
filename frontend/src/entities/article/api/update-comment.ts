import type { AxiosPromise } from "axios";
import { axiosInstance } from "@/shared/api/axios.instance";
import type { Comment, UpdateCommentDto } from "../model/types";

export const updateComment = async (
  articleId: string,
  commentId: string,
  dto: UpdateCommentDto,
): AxiosPromise<Comment> => {
  return await axiosInstance.patch<Comment>(`/articles/${articleId}/comments/${commentId}`, dto);
};