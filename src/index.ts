import bodyParser from 'body-parser';
import express, {
  Response,
  Express, Router
} from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
import errorHandler from '@/middlewares/errorHandler';
import ConnectDatabase from '@/configs/mysql';

const App = async () => {
  const PORT: string = process.env.PORT || '3000';
  const app: Express = express();

  dotEnv.config();
  await ConnectDatabase();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  app.listen(PORT, () => {
    console.log(`Server listen port ${PORT}`);
  });
  app.use(errorHandler);
  app.get('/', (_, res: Response) => {
    res.send(`Server is running!`)
  });
};

App();