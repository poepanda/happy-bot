import initDebug from 'debug';

import { findBySlackId } from 'src/modules/shopbacker';
import slackShopbackerProfile from '../templates/slackShopbackerProfile';
import createProfileInquiry from '../templates/createProfileInquiry';

const debug = initDebug('happy:slack:skill:shopbacker');

export default (bot, message) => {
  debug(message);
  const user = message.match[1] || message.user;
  findBySlackId(user)
    .then((result) => {
      if (!result) {
        bot.reply(message, createProfileInquiry(user));
      } else {
        bot.reply(message, slackShopbackerProfile(result));
      }
    })
    .catch((err) => {
      debug('fetch shobpacker error: ', err);
    });
};
