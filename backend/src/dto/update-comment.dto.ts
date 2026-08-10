import type z from 'zod';

import { CreateCommentDtoSchema } from './create-comment.dto.ts';

export const UpdateCommentDtoSchema = CreateCommentDtoSchema.partial();

export type UpdateCommentDto = z.infer<typeof UpdateCommentDtoSchema>;
