'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const body_parser_1 = __importDefault(require('body-parser'));
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const dotenv_1 = __importDefault(require('dotenv'));
const errorHandler_1 = __importDefault(require('./middleware/errorHandler'));
const App = async () => {
  const PORT = process.env.PORT || '3000';
  const app = (0, express_1.default)();
  const router = express_1.default.Router();
  dotenv_1.default.config();
  app.use(body_parser_1.default.urlencoded({ extended: false }));
  app.use((0, cors_1.default)());
  app.listen(PORT, () => {
    console.log(`Server listen port ${PORT}`);
  });
  app.use(errorHandler_1.default);
  router.get('/', (_, res) => {
    res.status(200);
    res.render(`Server listen port ${PORT}`);
  });
};
App();
//# sourceMappingURL=index.js.map
