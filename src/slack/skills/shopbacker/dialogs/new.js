import initDebug from 'debug';

const debug = initDebug('happy:slack:skills:shopbacker:dialogs');

const availableTeams = [
  {
    value: 'Vietnam - VTG / Highgarden',
    label: 'Vietnam - VTG / Highgarden',
  },
  {
    value: 'Vietnam - VTG / Winterfells',
    label: 'Vietnam - VTG / Winterfells',
  },
  {
    value: 'Vietnam - VTG / DragonStone',
    label: 'Vietnam - VTG / DragonStone',
  },
];

export default (bot, message, { me = false }) => {
  const dialog = bot.createDialog(
    'Add shopbacker',
    'new_shopbacker',
    'Add',
  );

  if (!me) {
    dialog.addSelect('Choose User', 'userId', null, [], {
      data_source: 'users',
    });
  }

  dialog
    .addText('Name', 'name', '', { placeholder: 'Full name' })
    .addTextarea('Bio', 'bio', '', { placeholder: 'Something about you.' })
    .addSelect('Select a team', 'team', null, availableTeams, {
      hint: `Give feedback on #${process.env.HAPPY_FEEDBACK_CHANNEL} if you could not find your team`,
    })
    .addText('What do you do?', 'role', '', { placeholder: 'sit and code' });


  bot.replyWithDialog(message, dialog.asObject(), (err) => {
    if (err) {
      debug('New shopbacker - dialog compose error: ', err);
    }
  });
};
