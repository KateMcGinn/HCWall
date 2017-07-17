// All our requires/dependencies
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const mongoose = require('mongoose')

// Connect to our Mongo database, using Mongoose and include our models
mongoose.connect('mongodb://katemcginn:<Smaragdgrun27>@hcwall-shard-00-00-4yopc.mongodb.net:27017,hcwall-shard-00-01-4yopc.mongodb.net:27017,hcwall-shard-00-02-4yopc.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=HCWall-shard-0&authSource=admin')

// Require our models
const Post = require('./models/posts')

// Require our "controllers" (i.e. routers)
const appRoutes = require('./routes/index.js')
const postsRoutes = require('./routes/posts.js')

// Creating our Application
const app = express()

// Registering and use our template engine (handlebars)
app.engine('handlebars', hbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Serving static files (like css)
app.use(express.static('public'))

// Use Body Parser
app.use(bodyParser.urlencoded({extended: true}))

// Routes
// application routes (i.e. controller)
app.use('/', appRoutes)
app.use('/posts', postsRoutes)

app.listen( 3000, () => {

  console.log( 'listening on 3000' )

})
