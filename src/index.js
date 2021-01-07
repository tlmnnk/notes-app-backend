const helmet = require('helmet')
const cors = require('cors')
const express = require('express')
const { StatusCodes, getReasonPhrase } = require('http-status-codes')
const tasksRouter = require('./resources/tasks/tasks.router')
const usersRouter = require('./resources/users/users.router')
const { connectToDB } = require('./db')
const { PORT, ORIGIN } = require('./config')

const app = express()

const corsOptions = {
  origin: ORIGIN,
  optionsSuccessStatus: 200,
}

app.use(helmet())
app.use(cors(corsOptions))

app.use(express.json())

app.use('/tasks', tasksRouter)
app.use('/users', usersRouter)

app.use((req, res) => {
  res.status(404).json('not found')
})

app.use((err, req, res, next) => {
  if (err) {
    console.log(err.stack)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
  }
  next()
})

connectToDB(() => {
  app.listen(PORT, () => {
    console.log(`Server is running under ${PORT}`)
  })
})
