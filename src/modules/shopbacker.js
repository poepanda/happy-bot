import Promise from 'bluebird';
import initDebug from 'debug';

import { document } from 'src/db';

const debug = initDebug('happy:modules:shopbacker');

const Shopbacker = data => document('Shopbacker', data);

export const findBySlackId = (slackId) => {
  const shopbacker = Shopbacker();
  return new Promise((resolve, reject) => {
    shopbacker.findOne({ slackId }, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

export const add = (data) => {
  const shopbacker = Shopbacker(data);
  return new Promise((resolve, reject) => {
    shopbacker.save((err, result) => {
      debug(err, result);
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

export default {
  findBySlackId,
};
