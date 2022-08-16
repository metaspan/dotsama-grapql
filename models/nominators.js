import mongoose from 'mongoose'
const { Schema } = mongoose;

const modelSchema = new Schema({
  chain: { type: String, required: true, index: true },
  accountId: { type: String, required: false, index: { unique: true } },
  nextSessions: [String],
  sessionIds: [String],
  controllerId: String,
  exposure: [String],
  targets: [String],
  rewardDestination: String,
  redeemable: Number,
  identity: Object
});

export default mongoose.model('Nominator', modelSchema, 'w3f_nominator');
