const express = require('express')

const Post = require('../models/posts.js')

const postsRouter = express.Router()

postsRouter.get('/new', ( req, res ) => {
    // new view
    // render template for creating a new article
    res.render('posts/new')

}).post('/new', ( req, res ) => {
    // create a new article in the DB
    // render show view for new article

    const newPost = new Post({
      url: req.body.url,
      author: req.body.author,
      title: req.body.title,
      description: req.body.description
    })

    newPost.save()

    res.redirect('/')

})

postsRouter.get('/:id', ( req, res ) => {

  Post.findById( req.params.id, ( err, post ) => {

    res.render( 'posts/show', { post: post } )

  })

}).post('/:id', ( req, res ) => {

  Post.findById( req.params.id, ( err, post ) => {

    post.comments.push( req.body )
    post.save()

    res.render( 'posts/show', { post: post } )

  })

})


module.exports = postsRouter
