const router = require('express').Router()
const userService = require('./users.service')
const { StatusCodes } = require('http-status-codes')
const auth = require('../../utils/auth')

router.route('/').get(auth, async (req, res) => {
  if (req.user) {
    const user = await userService.getCurrentUser(req.user.id)
    res.status(StatusCodes.OK).json(user)
  }
})

router.route('/').post(async (req, res, next) => {
  let user
  try {
    user = await userService.register(req.body)
    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    return next(error)
  }
})

router.route('/login').post(async (req, res) => {
  const user = await userService.signToken(req.body)
  if (!user) {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: 'Wrong email or password!' })
  } else {
    res.status(StatusCodes.OK).json(user)
  }
})

module.exports = router
