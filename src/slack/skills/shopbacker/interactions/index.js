import initDebug from 'debug';
import _ from 'lodash';

import newShopbacker from './new';
import editProfile from './edit';
import joinProject from './joinProject';
import leftProject from './leftProject';
import { ACTIONS_ID } from '../config';

const debug = initDebug('happy:slack:skills:shopbacker:interact');

export default (controller) => {
  debug('Skill learned!');
  controller.on('interactive_message_callback', (bot, message) => {
    debug(message);
    const callbackInfo = message.callback_id.split('-');
    const me = callbackInfo[1] && callbackInfo[1] === message.user;
    const action = `${callbackInfo[0]}/${_.get(message.actions[0], 'value', null)}`;
    debug('ACTION... ', action);
    switch (action) {
      case ACTIONS_ID.new: newShopbacker(bot, message, { me }); break;
      case ACTIONS_ID.edit: editProfile(bot, message, { me }); break;
      case ACTIONS_ID.joinProject: joinProject(bot, message, { me }); break;
      case ACTIONS_ID.leaveProject: leftProject(bot, message, { me }); break;
      default: bot.reply(message, 'Could not find this action');
    }
  });
};
