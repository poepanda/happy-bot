import initDebug from 'debug';
import skillDictionary from '../utils/skillDictionary';

const debug = initDebug('happy:slack:route:skills');

export default (app) => {
  // Web platform
  app.get('/slack/dictionary', (req, res) => {
    skillDictionary()
      .then((skills) => {
        debug('got skills ', JSON.stringify(skills, null, 2));
        res.render('slack-dictionary', { skills });
      })
      .catch((err) => {
        debug('skills dictionary error: ', err);
      });
  });
};
