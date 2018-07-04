import initDebug from 'debug';

const debug = initDebug('happy:api:error');
export default (err, req, res, next) => {
  if (!err) next();
  debug('Caught error: ', err);
  res.status(500).send('Something went wrong!');
};
