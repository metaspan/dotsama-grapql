import mongoose from 'mongoose'
const { Schema } = mongoose;

const modelSchema = new Schema({
  chain: { type: String, required: true, index: true },
  address: { type: String, required: true, index:true },
  stash: { type: String, required: true, index:true },
  proxy: { type: String, required: false, index:true },
  bonded: Number,
  avgStake: Number,
  current: [Object],
  lastNomination: Number,
  nominationAmount: Number,
  newBondedAmount: Number,
  rewardDestination: String,
  createdAt: Number,
  updatedAt: String
});

export default mongoose.model('Nominator1kv', modelSchema, '1kv_nominator');
