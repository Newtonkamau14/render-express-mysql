import { app } from "./app";
import { DatabaseConnection } from "./config/database";
import env from "./env";
import { normalizePort } from "./util/util";


const PORT = normalizePort(env.PORT);
const dbInstance = DatabaseConnection.getInstance();



try {
  dbInstance.connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  });
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error occurred: ${error.message}`);
  }
}

