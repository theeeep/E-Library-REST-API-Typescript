import { config } from "./src/config/config";
import app from "./src/app";
import connectDB from "./src/config/db";

const startServer = async () => {
  // connect database
  await connectDB();

  const PORT = config.port || 3000;

  app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
  });
};

startServer();
