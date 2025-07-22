import env from "./env";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import router from "./routes";
import * as middlewares from "./middleware/middleware";

const app: Application = express();

const allowedOrigins = [env.REACT_APP_FRONTEND];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});


// Middleware
app.use(express.json());
app.use(cors(options));
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(middlewares.notFound);
app.use(middlewares.notFound);


export { app };
