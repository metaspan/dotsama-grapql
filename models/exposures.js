import mongoose from 'mongoose'
const { Schema } = mongoose;

const modelSchema = new Schema({
  chain: { type: String, required: true, index: true },
  era: { type: Number, required: true, index: true },
  stash: { type: String, required: true, index: true },
  // shortStash: { type: String, required: true, index: true },
  // firstName: { type: String, required: true },
  // nominators: [{ type: String }],
  // nominators: [String],
  // lastName: { type: String, required: true },
  // userName: { type: String, required: true },
  // email: { type: String, required: true },
  // jobTitle: { type: String, required: false }
  others: [Object],
  total: Number,
  own: Number,
  updatedAt: { type: String, required: false }
})

export default mongoose.model('Exposure', modelSchema, 'w3f_exposure')
