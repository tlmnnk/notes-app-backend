const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config')

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization')
  if (authHeader) {
    const [type, token] = authHeader.split(' ')
    if (!['Bearer', 'Token'].includes(type)) {
      res.status(401).send('Wrong auth schema')
    } else {
      try {
        const user = jwt.verify(token, JWT_SECRET_KEY)
        req.user = user
        return next()
      } catch (error) {
        res.status(401).send('Unauthorized user!')
      }
    }
  } else {
    res.status(401).send('Unauthorized user!')
    return next()
  }
}
