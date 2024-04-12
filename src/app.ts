import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandling";

const app = express();

// Routes

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to Future" });
});

// Global error handler
app.use(globalErrorHandler);

export default app;
