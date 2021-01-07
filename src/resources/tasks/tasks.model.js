const mongoose = require('mongoose')
const slug = require('slug')
const uuid = require('uuid')

const taskSchema = new mongoose.Schema({
  title: String,
  createdAt: Number,
  description: String,
  slug: { type: String, lowercase: true, unique: true },
  author: { type: mongoose.Schema.Types.String, ref: 'User' },
  _id: {
    type: String,
    default: uuid,
  },
})

taskSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify()
  }
  next()
})

taskSchema.methods.toResponse = function () {
  return {
    title: this.title,
    createdAt: this.createdAt,
    description: this.description,
    slug: this.slug,
    author: this.author,
    id: this._id,
  }
}

taskSchema.methods.slugify = function () {
  this.slug = `${slug(this.title)}-${(Math.random() * Math.pow(36, 6)).toString(
    36
  )}`
}

module.exports = mongoose.model('Task', taskSchema)
