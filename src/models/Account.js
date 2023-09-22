import mongoose from 'mongoose'
import { COMPTE_COURANT } from 'src/utils/constant'

const Schema = mongoose.Schema

const accountSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    balance: {
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
    type: {
      type: String,
      required: true,
      default: `${COMPTE_COURANT}`
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
