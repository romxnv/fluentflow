import { z } from 'zod';

export const AnalyticQueryDtoSchema = z.object({
  dateFrom: z.string().datetime({ offset: true }),
  dateTo: z.string().datetime({ offset: true }),
});

export type AnalyticQueryDto = z.infer<typeof AnalyticQueryDtoSchema>;
