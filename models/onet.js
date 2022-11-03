import mongoose from 'mongoose'
const { Schema } = mongoose;

const modelSchema = new Schema({
  chain: { type: String, required: true, index: true },
  // stash: { type: String, required: true, index: { unique: true } },
  // // shortStash: { type: String, required: true, index: true },
  // name: { type: String, required: false, index: true },

  from_era: {type: Number},
  to_era: {type: Number},
  from_session: {type: Number},
  to_session: {type: Number},
  from_block: {type: Number},
  to_block: {type: Number},

  seq: {type: Number },
  validator: {type: String}, // ', name: 'Validator'},
  stash: {type: String, index: true}, // ', name: 'Validator'},
  subset: {type: String}, // ', name: 'Subset'},
  active_sessions: {type: Number}, // ', name: 'Active Sessions'},
  pv_sessions: {type: String}, // ', name: 'P/V Sessions'},
  authored_blocks: {type: Number},
  core_assignments: {type: Number},
  implicit_votes: {type: Number},
  explicit_votes: {type: Number},
  missed_votes: {type: String}, // ', name: '✗'},
  grade: {type: String}, // ', name: 'Grade'},
  mvr: {type: Number}, // ', name: 'MVR'},
  avg_ppts: {type: Number}, // ', name: 'Avg. PPTS'},
  score: {type: Number}, // ', name: 'Score'},
  commission: {type: String}, // ', name: 'Commission (%)'},
  commission_score: {type: String}, // ', name: 'Commission Score'},
  timeline: {type: String}, // ', name: 'Timeline'

  updatedAt: { type: String, required: false }
});

// module.exports = mongoose.model('users', userSchema);
export default mongoose.model('Onet', modelSchema, 'w3f_onet');
