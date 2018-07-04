import mongoose from 'mongoose';
import shopbackerSchema from '../schemas/shopbacker';

const Shopbacker = mongoose.model('Shopbacker', shopbackerSchema);

export default Shopbacker;
