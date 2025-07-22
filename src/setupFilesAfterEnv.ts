import { sequelize } from "./config/database";

global.afterAll(async () => {
  await sequelize.close();
});
