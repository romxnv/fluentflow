import { type NextFunction, type Request, type Response } from 'express';

import analyticService from '../services/analytic.service.ts';
import type { AnalyticQueryDto } from '../dto/analytic-query.dto.ts';

const getCommentsAnalytics = async (
  req: Request<{}, {}, {}, AnalyticQueryDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const analytics = await analyticService.getCommentsAnalytics(req.query);

    res.status(200).json({
      data: analytics,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getCommentsAnalytics,
};
