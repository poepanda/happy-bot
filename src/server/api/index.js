import bodyParser from 'body-parser';
import apiRoutes from './routes';

export default (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api', apiRoutes);
};
