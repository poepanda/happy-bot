import _ from 'lodash';

export default specialCases => (bot, message) => {
  const matchSpecialCases = _.get(specialCases, message.match[0], false);
  bot.reply(message, matchSpecialCases || 'hi');
};
