// NOT USED, we can get this from substrate API

import mongoose from 'mongoose'
const { Schema } = mongoose;

const modelSchema = new Schema({
  chain: { type: String, required: true, index: true },
  accountId: { type: String, required: true, index: { unique: true } },
  // shortStash: { type: String, required: true, index: true },
  name: { type: String, required: false, index: true },
  // firstName: { type: String, required: true },
  // nominators: [{ type: String }],
  // nominators: [String],
  // lastName: { type: String, required: true },
  // userName: { type: String, required: true },
  // email: { type: String, required: true },
  // jobTitle: { type: String, required: false }
  discoveredAt: String,
  nominatedAt: String,
  offlineSince: Number,
  offlineAccumulated: Number,
  rank: Number,
  faults: Number,
  invalidityReasons: String,
  unclainedEras: [String],
  inclusion: Number,
  kusamaStash: String,
  commission: Number,
  identity: '',
  active: Boolean,
  valid: Boolean,
  // validity: [Validity],
  score: '',
  total: Number,
  location: String,
  councilStake: Number,
  councilVotes: [String],
  democractVoteCount: Number,
  democracyVotes: [Number],
  stale: Boolean,
  updatedAt: { type: String, required: false }
});

// module.exports = mongoose.model('users', userSchema);
export default mongoose.model('Account', modelSchema, 'w3f_account');
