import type { AxiosPromise } from "axios";

import { axiosInstance } from "@/shared/api/axios.instance";

export const deleteComment = async (
  articleId: string,
  commentId: string,
): AxiosPromise<void> => {
  return await axiosInstance.delete(
    `/articles/${articleId}/comments/${commentId}`,
  );
};
