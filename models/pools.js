import mongoose from 'mongoose'
const { Schema } = mongoose;

const modelSchema = new Schema({
  chain: { type: String, required: true, index: true },
  id: { type: Number, required: true, index: { unique: true } },
  name: { type: String, required: false, index: true },
  state: String,
  // nominators: [{ type: String }],
  // identity: Object,
  members: [Object],
  memberCounter: Number,
  balance: Number,
  totalEarnings: Number,
  // lastName: { type: String, required: true },
  // userName: { type: String, required: true },
  // email: { type: String, required: true },
  // jobTitle: { type: String, required: false }
  updatedAt: { type: String, required: false }
});

// module.exports = mongoose.model('users', userSchema);
export default mongoose.model('Pool', modelSchema, 'w3f_pool');
