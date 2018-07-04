import 'app-module-path/register';

import './src/utils/import-env';
import initSlackBot from './src/slack';
import { webServer, httpServer } from './src/server';


initSlackBot(webServer, httpServer);
