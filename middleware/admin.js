const Admin = require('../database/models/Admin')

module.exports = (request, response, next) => {

  //fetch admin from database
  Admin.findById(request.session.userId, (error, user) => {

    if (error || !user) {

      return response.redirect('/admin/dash')
    }

    next()

  })
  
}