import { config } from "./src/config/config";
import app from "./src/app";

const startServer = () => {
  const PORT = config.port || 3000;

  app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
  });
};

startServer();
