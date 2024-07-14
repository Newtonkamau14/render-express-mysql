import { Request } from "express";

declare global {  
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_PORT: number;
      DATABASE_HOST: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_NAME: string;
    }
  }
}
  