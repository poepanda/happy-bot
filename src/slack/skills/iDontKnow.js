import d from 'debug';

const debug = d('happy:slack:skills:iDontKnow');

export default (controller) => {
  debug('Skill learned!');

  controller.hears('.*', 'direct_message, mention, direct_mention', (bot, message) => {
    debug(message.match);
    bot.reply(message, `
      Don't really know what you mean : ) \n> This is what I can do at the moment: ${process.env.ORIGIN}/slack/dictionary
    `);
  });
};
