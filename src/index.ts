import bodyParser from 'body-parser';
import express, {
  Response,
  Express,
  Router,
} from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
dotEnv.config();
import { errorHandler } from '@/middlewares/ErrorHandler';
import { routersCatetory } from '@/routers/category';
import { sequelize } from '@/configs/ConnectDB';

const App = async () => {
  const PORT: string = process.env.PORT || '3000';
  const app: Express = express();
  const api_v1: Router = express.Router();

  // Connection database
  try {
    await sequelize.authenticate();
    console.log('Connect db successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
  app.use(express.urlencoded({
    extended: true
  }))
  app.use(express.json())
  app.use(cors());
  app.use("/", express.static("public"));

  app.listen(PORT, () => {
    console.log(`Server listen port ${PORT}`);
  });

  app.use('/api/v1', api_v1);
  routersCatetory(api_v1);

  app.use(errorHandler);
  app.get('/', (_, res: Response) => {
    res.send(`Server is running!`)
  });
};

App();