import mongoose from 'mongoose'
import { CREDIT_D_AFFAIRE } from 'src/utils/constant'

const Schema = mongoose.Schema

const creditRequestSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      required: true,
      default: `${CREDIT_D_AFFAIRE}`
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      default: 'created'
    }
  },
  { timestamps: true }
)

const CreditRequest = mongoose.models.CreditRequest || mongoose.model('CreditRequest', creditRequestSchema)

export default CreditRequest
