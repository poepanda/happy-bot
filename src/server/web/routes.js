import express from 'express';
import * as controllers from './controllers';


const routes = express.Router();

routes.get('/', controllers.home);
routes.get('/shopbacker', controllers.shopbacker);

export default routes;
