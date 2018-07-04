import initDebug from 'debug';

import newShopbacker from './new';
import { ACTIONS_ID } from '../config';

const debug = initDebug('happy:slack:skills:shopbacker:submission');

export default (controller) => {
  debug('Skill learned!');
  controller.on('dialog_submission', (bot, message) => {
    switch (message.callback_id) {
      case ACTIONS_ID.new: newShopbacker(bot, message); break;
      case ACTIONS_ID.edit: newShopbacker(bot, message); break;
      case ACTIONS_ID.joinProject: newShopbacker(bot, message); break;
      case ACTIONS_ID.leaveProject: newShopbacker(bot, message); break;
      default: bot.reply(message, 'Could not this submission!');
    }
  });
};
