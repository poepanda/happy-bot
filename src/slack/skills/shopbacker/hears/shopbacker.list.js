import initDebug from 'debug';

const debug = initDebug('happy:slack:skills:shopbacker.list');

export default (controller) => {
  // List shopbackers
  controller.hears(['^list (shopbackers|shopbacker)'], 'direct_message, mention, direct_mention', (bot, message) => {
    debug('Heard!');
    bot.reply(message, 'I heard you');
  });
};
