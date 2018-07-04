import path from 'path';
import botkit from 'botkit';
import botkitMongo from 'botkit-storage-mongo';
import learnSkills from './skills';
import slackRoutes from './routes';
import skillDic from './utils/skillDictionary';

const initSlackBot = (webServer, httpServer) => {
  const botOptions = {
    clientId: process.env.slack_clientId,
    clientSecret: process.env.slack_clientSecret,
    scopes: ['bot'],
    debug: process.NODE_ENV === 'development',
  };

  if (process.env.slack_mongoURI) {
    botOptions.storage = botkitMongo({ mongoUri: process.env.slack_mongoURI });
  } else {
    botOptions.json_file_store = path.join(__dirname, '.data/db/');
  }

  const controller = botkit.slackbot(botOptions);

  if (webServer && httpServer) {
    controller.startTicking();

    slackRoutes(webServer, controller);
    learnSkills(controller);

    controller.webServer = webServer;
    controller.httpServer = httpServer;
  }

  return controller;
};

skillDic();

export default initSlackBot;
