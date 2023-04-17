import bodyParser from 'body-parser';
import express, { Response, Express, Router } from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
dotEnv.config();
import { errorHandler } from '@/middlewares/ErrorHandler';
import { sequelize } from '@/configs/ConnectDB';
import { adminRoutes } from '@/routers/Admin';
import { routes } from '@/routers/index';

const App = async () => {
  const PORT: string = process.env.PORT || '3000';
  const app: Express = express();
  const api_admin: Router = express.Router();
  const api: Router = express.Router();

  // Connection database
  try {
    await sequelize.authenticate();
    console.log('Connect db successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  require('@/models/index');

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(
    express.urlencoded({
      extended: true
    })
  );
  app.use(express.json());
  app.use(cors());
  app.use('/', express.static('public'));

  app.listen(PORT, () => {
    console.log(`Server listen port ${PORT}`);
  });

  app.use('/api/v1/admin', api_admin);
  app.use('/api/v1', api);
  adminRoutes(api_admin);
  routes(api);

  app.use(errorHandler);
  app.get('/', (_, res: Response) => {
    res.send(`Server is running!`);
  });
};

App();
