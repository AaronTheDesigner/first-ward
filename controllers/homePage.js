const Post = require('../database/models/Post')
const Date = require('../database/models/Date')

module.exports = async (request, response) => {
  
  const posts = await Post.find({}).populate('author');
  const dates = await Date.find({}).populate();

  response.render('index', {

    posts,

    dates

  });

}