import mongoose from 'mongoose';
import * as models from './models';

const debug = require('debug')('happy:db');

const {
  /* eslint-disable camelcase */
  MONGO_PROTOCOL,
  MONGO_URI,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_DB,
  NODE_ENV,
  /* eslint-enable camelcase */
} = process.env;

mongoose.connect(`${MONGO_PROTOCOL}${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URI}/${MONGO_DB}`, { // eslint-disable-line camelcase
  autoIndex: NODE_ENV !== 'production',
});

const db = mongoose.connection;

db.on('open', () => {
  debug('Connected to DB successfully!');
});

export const document = (name, initialData) => {
  const Model = models[name];
  if (!Model) {
    return null;
  }
  return initialData ? new Model(initialData) : Model;
};

export default () => {

};
