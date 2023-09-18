import mongoose from 'mongoose'
import { CREDIT_D_AFFAIRE, EPARGNE } from 'src/utils/accountType'

const Schema = mongoose.Schema

const accountSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      required: true,
      default: 0.0
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    type: {
      type: String,
      required: true,
      default: `${EPARGNE}`
    },
    subType: {
      type: String,
      required: true,
      default: `${CREDIT_D_AFFAIRE}`
    },
    emergencyContacts: {
      type: String
    },
    status: {
      type: String,
      default: 'created'
    }
  },
  { timestamps: true }
)

const Account = mongoose.models.Account || mongoose.model('Account', accountSchema)

export default Account
