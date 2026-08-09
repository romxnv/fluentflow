import type z from 'zod';

import { CreateArticleDtoSchema } from './create-article.dto.ts';

export const UpdateArticleDtoSchema = CreateArticleDtoSchema.partial();

export type UpdateArticleDto = z.infer<typeof UpdateArticleDtoSchema>;
