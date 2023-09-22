import mongoose from 'mongoose'

const Schema = mongoose.Schema

const movementSchema = new Schema(
  
  {
    code: {
      type: String,
      required: true,
      unique: true
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
    rate: {
      type: Number
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
    destinationAccounts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Account'
    },
    note: {
      type: String
    },
    status: {
      type: String,
      default: 'created'
    }
  },
  { timestamps: true }
)

const Movement = mongoose.models.Movement || mongoose.model('Movement', movementSchema)

export default Movement
