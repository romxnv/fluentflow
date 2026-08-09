import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import router from './routes/index.ts';
import { sequelize } from './config/database.ts';

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database synchronized');

    app.listen(process.env.PORT, () => {
      console.log(`Application listening on PORT: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

start();
