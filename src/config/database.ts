import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
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
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export { sequelize, DatabaseConnection };
