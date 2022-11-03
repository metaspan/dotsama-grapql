import mongoose from 'mongoose'
const { Schema } = mongoose;

const modelSchema = new Schema({
  chain: { type: String, required: true, index: true },
  stash: { type: String, required: true, index: { unique: true } },
  shortStash: { type: String, required: true, index: true },
  name: { type: String, required: false, index: true },
  // firstName: { type: String, required: true },
  // nominators: [{ type: String }],
  identity: Object,
  prefs: Object,
  nominators: [String],
  // lastName: { type: String, required: true },
  // userName: { type: String, required: true },
  // email: { type: String, required: true },
  // jobTitle: { type: String, required: false }
  updatedAt: { type: String, required: false }
});

// module.exports = mongoose.model('users', userSchema);
export default mongoose.model('Validator', modelSchema, 'w3f_validator');
