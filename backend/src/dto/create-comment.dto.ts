import z from 'zod';

export const CreateCommentDtoSchema = z.object({
  message: z.string().min(1, { message: 'Message cannmot be empty' }),
});

export type CreateCommentDto = z.infer<typeof CreateCommentDtoSchema>;
