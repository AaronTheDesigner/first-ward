const Admin = require('../database/models/Admin')
const bcrypt = require('bcrypt')

module.exports = (request, response) => {

  const { email, password } = request.body;

  //find admin

  Admin.findOne({ email }, (error, user) => {

    console.log(user)

    if (user) {

      bcrypt.compare(password, user.password, (error, name) => {

        if (same) {

          request.session.userId = user._id

          response.redirect('/admin/dash')

        } else {

          response.redirect('/admin')
    

        }

      })

    } else {

      return response.redirect('/admin')
    }
    
  })

}