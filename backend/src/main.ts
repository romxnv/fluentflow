import express, { type Request, type Response } from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`Application listening on PORT: ${process.env.PORT}`);
});
