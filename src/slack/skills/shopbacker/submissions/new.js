import Promise from 'bluebird';
import { document } from 'src/db';
import initDebug from 'debug';

import createProfileInquiry from '../templates/createProfileInquiry';

const debug = initDebug('happy:slack:skills:shopbacker:submission');

const getSlackUserInfo = (bot, message) => (
  new Promise((resolve, reject) => bot.api.users.info({ user: message.user }, (err, data) => {
    if (err) return reject(err);
    return resolve(data.user);
  }))
);

const saveShopbacker = ({
  name,
  bio,
  team,
  role,
  userId,
}) => ({ id, profile }) => {
  const data = {
    slackId: userId || id,
    name,
    email: profile.email,
    bio,
    avatarUrl: profile.image_192,
    team,
    role,
  };
  debug('Save Shopbacker: ', data);

  const shopbacker = document('Shopbacker', data);
  return new Promise((resolve, reject) => {
    shopbacker.save((err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const createShopbacker = (bot, message) => {
  getSlackUserInfo(bot, message)
    .then(saveShopbacker(message.submission))
    .then((result) => {
      debug('Create shopbacker successfully: ', result);
      bot.dialogOk();
      bot.reply(message, 'The shopbacker profile has been added! ; )');
    })
    .catch((err) => {
      debug('Create shopbacker error: ', err);
      bot.dialogOk();
      bot.reply(message, `Errors:\n> ${err.toString()}\n post me on #${process.env.HAPPY_FEEDBACK_CHANNEL} if you dont know what it is ; )`);
      bot.reply(
        message,
        createProfileInquiry(message.submission.userId || message.user, true),
      );
    });
};

export default (bot, message) => {
  debug('create new shopbacker: ', message);
  bot.api.users.info({ user: message.user }, (err, result) => {
    debug('USER: ', result, err);
  });
  createShopbacker(bot, message);
};
