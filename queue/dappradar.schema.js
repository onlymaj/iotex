
import mongoose from 'mongoose';



const dapprradarSchema = new mongoose.Schema({
  block: Number,
  hash: String,
  from: String,
  to: String,
  none: String,
});

export default mongoose.model('iotex', dapprradarSchema);
