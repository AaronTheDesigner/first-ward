const User = require('../database/models/User')
const bcrypt = require('bcrypt')

module.exports = (request, response) => {

  const { email, password } = request.body;

  //find user

  User.findOne({ email }, (error, user) => {
    
    if (user) {

      bcrypt.compare(password, user.password, (error, same) => {

        if (same) {

          request.session.userId = user._id
          
          response.redirect('/')

        } else {


          response.redirect('/auth/login')

        }
      
      })
    
    } else {

      return response.redirect('/auth/login')
    }
  
  })

  //compare user password

  //if user password is correct then login user

  //else

  //redirect user back

}