const Task = require('./tasks.model')

const getTaskByUserId = async (id) => Task.find({ author: id })

const addTask = async ({ id, title, description }) => {
  const newTask = new Task()
  newTask.title = title
  newTask.description = description
  newTask.author = id
  newTask.createdAt = new Date().getTime()
  return newTask.save()
}

const deleteTask = async (id) => {
  const q = await Task.deleteOne({ _id: id })
  return q.deletedCount
}

module.exports = {
  getTaskByUserId,
  deleteTask,
  addTask,
}
