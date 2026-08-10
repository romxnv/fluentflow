import express from 'express';
import analyticController from '../controllers/analytic.controller.ts';

const router = express.Router();

router.get('/comments', analyticController.getCommentsAnalytics);

export default router;
