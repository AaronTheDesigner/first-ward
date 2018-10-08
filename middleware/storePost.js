

module.exports = (request, response, next) => {
  
  if(!request.files.image || !request.body.title || !request.body.description || !request.body.content) {

    return response.redirect('/post/new')

  }

  next()

}

