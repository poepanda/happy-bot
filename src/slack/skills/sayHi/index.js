import initDebug from 'debug';
import { listenTo } from './config';

const debug = initDebug('happy:slack:skills:sayHi');

export default (controller) => {
  debug('Skill learned!');

  controller.on('sayHi', (bot) => {
    debug('the bot is on-boarding', bot.config);
    bot.startPrivateConversation({ user: bot.config.createdBy }, (err, convo) => {
      if (err) {
        debug('Error: cannot start conversation with user', err);
      } else {
        convo.say('Hi! I\'m happy!');
      }
    });
  });

  listenTo.forEach((skill) => {
    const { patterns, from, handler } = skill;
    controller.hears(patterns, from, handler);
  });
};
