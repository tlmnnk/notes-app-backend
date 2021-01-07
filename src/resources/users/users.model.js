const mongoose = require('mongoose')
const uuid = require('uuid')

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: String,
})

userSchema.methods.toRegisterResponse = function (token) {
  return {
    token,
    id: this._id,
    email: this.email,
  }
}

module.exports = mongoose.model('User', userSchema)
