import initDebug from 'debug';

import { document } from 'src/db';
import friendlyDBError from 'src/db/utils/error';

const debug = initDebug('happy:slack:skills:shopbacker.find');

const errorFormat = message => `> - ${message} \n`;

const shopbackerProfileMsg = (shopbacker) => {
  debug('returned', shopbacker);
  return 'hi';
};

const findShopbackerBySlack = (slackId, bot, message) => {
  debug('Looking for ', slackId);
  const shopbacker = document('Shopbacker');
  shopbacker.findOne({ slackId }, (err, data) => {
    if (err) {
      return bot.reply(message, `Uhoh! Something went wrong here:\n${friendlyDBError(err, errorFormat)}`);
    }
    return bot.reply(message, shopbackerProfileMsg(data));
  });
};

export default (controller) => {
  controller.hears(/^(who is|tell me about)[\s]?<@(.*)>/, 'direct_message, mention, direct_mention', (bot, message) => {
    // findShopbackerBySlack(messag e.match);
    debug('message', message.match);
  });

  controller.hears(/^<@(.*)>$/, 'direct_message, mention, direct_mention', (bot, message) => {
    findShopbackerBySlack(message.match[1], bot, message);
  });
};
