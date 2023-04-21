import mongoose from 'mongoose'
const { Schema } = mongoose;

const modelSchema = new Schema({
  chain: { type: String, required: true, index: true },
  address: { type: String, required: true, index:true },
  era: { type: Number, required: true, index:true },
  timestamp: Number,
  bonded: Number,
  blockHash: String,
  validators: { type: Object },
  // nominationAmount: Number,
  // newBondedAmount: Number,
  // rewardDestination: String,
  // createdAt: Number,
  updatedAt: String
});

export default mongoose.model('Nomination1kv', modelSchema, '1kv_nomination');
