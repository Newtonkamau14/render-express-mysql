import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import { normalizePort } from "./util/util";
import { DatabaseConnection } from "./config/database"; 
import router from './routes';

const PORT = normalizePort(process.env.PORT || '3000');
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

try {
  const dbInstance = DatabaseConnection.getInstance();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    dbInstance.connectDb();
  });
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error occurred: ${error.message}`);
  }
}

export { app };
