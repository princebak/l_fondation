import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "client",
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    select: false,
  },
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
