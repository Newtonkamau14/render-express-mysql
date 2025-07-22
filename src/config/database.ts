import { Sequelize } from "sequelize";
import env from "../env";

const sequelize = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USER,
  env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dialectOptions: {
      connectTimeout: 60000, // 60 seconds timeout
    },
    ssl: true,
  }
);

class DatabaseConnection {
  private static instance: DatabaseConnection;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new DatabaseConnection();
    return this.instance;
  }

  async connectDb() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      // await sequelize.sync({alter:true})
      // console.log("Tables created")
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export { sequelize, DatabaseConnection };
