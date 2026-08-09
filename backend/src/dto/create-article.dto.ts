import z from 'zod';

export const CreateArticleDtoSchema = z.object({
  title: z.string().min(1, { message: 'Title cannot be empty' }).max(256),
  content: z.string().min(1, { message: 'Content cannot be empty' }),
});

export type CreateArticleDto = z.infer<typeof CreateArticleDtoSchema>;
