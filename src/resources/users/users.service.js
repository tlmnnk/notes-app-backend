const jwt = require('jsonwebtoken')
const repo = require('./users.repo')
const { JWT_SECRET_KEY } = require('../../config')
const { checkHashedPassword } = require('../../utils/hashHelper')

const getCurrentUser = async (id) => repo.getCurrentUser(id)

const register = async ({ email, password }) => {
  const newUser = await repo.register({ email, password })
  const token = jwt.sign({ id: newUser._id }, JWT_SECRET_KEY)
  return newUser.toRegisterResponse(token)
}

const signToken = async ({ email, password }) => {
  const user = await repo.findByEmail(email)

  if (!user) {
    return null
  }

  const { password: hashedPassword } = user

  const comparison = await checkHashedPassword(password, hashedPassword)
  if (comparison) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY)
    return user.toRegisterResponse(token)
  }
  return null
}

module.exports = {
  register,
  signToken,
  getCurrentUser,
}
