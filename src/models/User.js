import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
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
})

const User = mongoose.models.Users || mongoose.model('Users', userSchema)

export default User
