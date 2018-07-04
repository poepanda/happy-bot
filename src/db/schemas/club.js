import { Schema } from 'mongoose';
import { timestamps } from './commonFields';

const clubSchema = new Schema({
  id: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  ...timestamps,
});

export default clubSchema;
