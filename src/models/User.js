import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    gender: {
      type: String
    },
    pin: {
      type: String
    },
    dob: {
      type: Date
    },
    maritalStatus: {
      type: String
    },
    address: {
      type: String
    },
    type: {
      type: String,
      required: true,
      default: 'client'
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      select: false
    }
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
