const User = require('../database/models/User')

module.exports = (request, response, next) => {

  //fetch user from database

  if (request.session.userId) {

    return response.redirect('/')

  }
  
  next()
}