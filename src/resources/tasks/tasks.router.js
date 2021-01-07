const router = require('express').Router()
const { StatusCodes } = require('http-status-codes')
const tasksService = require('./tasks.service')
const auth = require('../../utils/auth')

router.route('/').get(auth, async (req, res) => {
  if (req.user) {
    const tasks = await tasksService.getTasks(req.user)
    const toResponse = tasks.map((task) => task.toResponse())
    res.status(200).json(toResponse)
  }
})

router.route('/').post(auth, async (req, res) => {
  const { title, description } = req.body

  const newTask = await tasksService.addTask({
    id: req.user.id,
    title,
    description,
  })
  if (!newTask) {
    res.status(StatusCodes.NOT_ACCEPTABLE)
  } else {
    res.status(StatusCodes.OK).json(newTask.toResponse())
  }
})

router.route('/:task').delete(auth, async (req, res) => {
  const taskId = req.params.task

  const taskToDelete = await tasksService.deleteTask(taskId)

  if (!taskToDelete) {
    res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
  } else {
    res.sendStatus(StatusCodes.OK)
  }
})

module.exports = router
