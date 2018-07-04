import { document } from 'src/db';
import initDebug from 'debug';

const debug = initDebug('happy:api:shopbacker.list');

export default (req, res) => {
  debug('backer');
  const club = document('Shopbacker');
  club.find({}, (err, result) => {
    debug('Founded shopbackers: ', result.length);
    res.json(result);
  });
};
