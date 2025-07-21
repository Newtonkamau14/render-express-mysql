import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number().min(1000).max(9999).default(3000),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number().min(1000).max(9999).default(3306),
  ENV: z
    .union([
      z.literal("development"),
      z.literal("testing"),
      z.literal("production"),
    ])
    .default("development"),

  REACT_APP_FRONTEND: z.string().default("http://localhost:5173"),
});

const env = EnvSchema.parse(process.env);

export default env;
