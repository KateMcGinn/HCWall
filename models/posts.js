const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  url: String,
  author: String,
  title: String,
  description: String,
  comments: Array
})

const Post = mongoose.model( 'Post', postSchema )

module.exports = Post
