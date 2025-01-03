import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import { normalizePort } from "./util/util";
import { DatabaseConnection } from "./config/database";
import cors from "cors";
import router from "./routes";

const PORT = normalizePort(process.env.PORT || "3000");
const app: Application = express();

const allowedOrigins = ["http://localhost:5173",process.env.REACT_APP_FRONTEND];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(cors(options));
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

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

export { app };
