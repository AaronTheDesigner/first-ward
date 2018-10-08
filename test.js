const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-blog')

Post.find({}, (error, posts ) => {
  console.log(error, posts)
})

 Post.create({
  title: 'second',
  
  description: 'second description',
  
  content: 'second content'
}, (error, post) => {

  console.log(error, post)

})

// Admin.create({

//   username: 'Eleanor',

//   email: 'etoliver@fwcdc.org',

//   password: 'toliver642',

// });





