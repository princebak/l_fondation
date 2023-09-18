import mongoose from 'mongoose'

const Schema = mongoose.Schema

const movementSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      default: 0.0
    },
    currency: {
      type: String,
      required: true,
      default: 'USD'
    },
    sourceAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    destinationAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    status: {
      type: String,
      default: 'created'
    }
  },
  { timestamps: true }
)

const Movement = mongoose.models.Movements || mongoose.model('Movement', movementSchema)

export default Movement
