import express from 'express';
import path from 'path';

import errorHandler from './middlewares/errorHandler';
import webRoutes from './routes';

const hbs = require('express-hbs');

export default (app) => {
  app.engine('hbs', hbs.express4({
    extname: '.hbs',
  }));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  app.use(express.static(path.join(__dirname, 'public')));

  app.use(webRoutes);
  app.use(errorHandler);
};
