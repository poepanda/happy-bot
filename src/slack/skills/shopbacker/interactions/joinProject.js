import _ from 'lodash';
import initDebug from 'debug';

import sendNewShopbackerForm from '../dialogs/new';

const debug = initDebug('happy:slack:skills:shopbacker:interact');

export default (bot, message, { me }) => {
  debug('Shopbacker - new actions ', message);
  if (_.find(message.actions, { value: 'cancel' })) {
    return bot.replyInteractive(message, 'Alright! Ping me when you need it :grin:');
  }
  bot.replyInteractive(message, 'Filling the form :grin:');
  return sendNewShopbackerForm(bot, message, { me });
};
