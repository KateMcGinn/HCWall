var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://katemcginn:Rubinrot27@ds163672.mlab.com:63672/hcwall');

var PostSchema = mongoose.Schema({
  title: {type: String, required: true},
  creator: String,
  email: String,
  posted: {type: Date, default: Date.now},
  duration: {type: String, enum: ['Short Term', 'Long Term']},
  description: String
}, {collection: 'posts'});

var PostModel = mongoose.model('PostModel', PostSchema);

app.use(express.static('/Users/katemcginn/Desktop/javascript/HCWall' + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.post("/api/blogpost", createPost);
app.get("api/blopost", getAllPosts);
app.delete("/api/blopost/:id", deletePost);

function deletePost(req, res) {
  var postId = req.params.id;
  PostModel
  .remove({_id: postId})
  .then(
    function (status) {
      res.sendStatus(200);
    },
    function() {
      res.sendStatus(400);
    }
  );
}


function getAllPosts(req, res) {
  PostModel
    .find()
    .then(
      function (posts) {
        res.json(posts);
      },
      function(err) {
        res.sendStatus(400);
      }
    );
}

function createPost(req, res) {
  var post = req.body;
  console.log(post);
  PostModel
    .create(post)
    .then(
      function (postObj) {
            res.json(200);
      },
      function (error) {
        res.sendStatus(400);
      }
    );
}

app.listen(3000);
