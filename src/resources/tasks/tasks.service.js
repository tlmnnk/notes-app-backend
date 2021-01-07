const repo = require('./tasks.repo')

const getTasks = ({ id }) => repo.getTaskByUserId(id)

const addTask = (task) => repo.addTask(task)

const deleteTask = (id) => repo.deleteTask(id)

module.exports = {
  getTasks,
  addTask,
  deleteTask,
}
