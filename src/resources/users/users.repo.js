const User = require('./users.model')
const { hashPassword } = require('../../utils/hashHelper')

const getCurrentUser = (_id) => User.findById({ _id })

const findByEmail = (email) => User.findOne({ email })

const register = async ({ email, password }) => {
  const newUser = new User()
  newUser.email = email
  newUser.password = await hashPassword(password)
  await newUser.save()
  return newUser
}

module.exports = {
  register,
  findByEmail,
  getCurrentUser,
}
