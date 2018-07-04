import express from 'express';

import apiErrorHandler from './middlewares/errorHandler';
import list from './controllers/shopbacker.list';
import add from './controllers/shopbacker.add';

const routes = express.Router();

routes.get('/shopbacker', list);
routes.post('/shopbacker/add', add);

routes.use(apiErrorHandler);

export default routes;
