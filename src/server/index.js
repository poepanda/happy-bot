import express from 'express';
import initDebug from 'debug';

import injectWeb from './web';
import injectApi from './api';

const debug = initDebug('happy:server');
const port = process.env.PORT || 3000;

const app = express();

injectWeb(app);
injectApi(app);

const server = app.listen(3000, () => {
  debug(`Server is listenning on port ${port}`);
});

export const webServer = app;
export const httpServer = server;
