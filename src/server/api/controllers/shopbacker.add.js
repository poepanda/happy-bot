import initDebug from 'debug';

const debug = initDebug('happy:api:shopbacker.add');

export default (req, res) => {
  // TODO: Implement API endpiont to add shopbacker
  // Consider => query SlackID to integrate with Slack.
  debug('Someone wanna add Shopbacker via API');
  res.status(503).send('This is in progress!');
};
