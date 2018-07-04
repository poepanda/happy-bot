import { Schema } from 'mongoose';
import Promise from 'bluebird';
import { timestamps } from './commonFields';

const memberFields = {
  id: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  roles: [{
    name: {
      type: String,
      required: true,
    },
    todo: {
      type: String,
    },
  }],
};

const shopbackerSchema = new Schema({
  slackId: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: email => (
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
      ),
      message: '{VALUE} is not a valid email!',
    },
  },
  bio: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  projects: [{ ...memberFields }],
  clubs: [{ ...memberFields }],
  entity: [{ ...memberFields }],
  ...timestamps,
});

shopbackerSchema.methods.savePromise = function savePromise() {
  return new Promise((resolve, reject) => {
    this.save((err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

export default shopbackerSchema;
