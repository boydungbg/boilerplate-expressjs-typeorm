import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'mysql',
  define: {
    underscored: true,
    charset: 'utf8',
    engine: 'MYISAM'
  },
  logging: console.log
});

export { sequelize };
