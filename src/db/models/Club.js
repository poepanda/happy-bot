import mongoose from 'mongoose';
import clubSchema from '../schemas/shopbacker';

const Club = mongoose.model('Club', clubSchema);

export default Club;
