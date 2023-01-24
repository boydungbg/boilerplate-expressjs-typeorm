import { Sequelize } from "sequelize"

const ConnectDatabase = async () => {
  const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
    logging: console.log
  });
  try {
    await sequelize.authenticate();
    console.log('Connect db successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default ConnectDatabase;
