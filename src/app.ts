import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandling";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to Future" });
});

// Routers
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
