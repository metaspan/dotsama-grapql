import mongoose from 'mongoose'
const { Schema } = mongoose;

const modelSchema = new Schema({
  chain: { type: String, required: true, index: true },
  active: Boolean,
  bonded: Number,
  commission: Number,
  controller: String,
  convictionVoteCount: Number,
  councilVotes: [String],
  coreCount: Number,
  country: String,
  cpu: String,
  councilStake: Number,
  councilVotes: [String],
  democracyVoteCount: Number,
  democracyVotes: [Number],
  discoveredAt: String,
  faults: Number,
  identity: '',
  implementation: String,
  inclusion: Number,
  invalidityReasons: String,
  kusamaStash: String,
  location: String,
  matrix: [String],
  memory: String,
  name: { type: String, required: false, index: true },
  nextKeys: String,
  nominatedAt: String,
  nominations: String,
  offlineAccumulated: Number,
  offlineSince: Number,
  openGovDelecations: String,
  provider: String,
  queuedKeys: String,
  rank: Number,
  region: String,
  rewardDestination: String,
  score: '',
  stash: { type: String, required: true, index: { unique: true } },
  total: Number,
  unclaimedEras: [String],
  validity: [Object],
  // # is this used?
  stale: Boolean,
  version: String,
  vm: Boolean,
  updatedAt: { type: String, required: false }
});

// module.exports = mongoose.model('users', userSchema);
export default mongoose.model('Candidate', modelSchema, '1kv_candidate');
