const bcrypt = require('bcrypt')

const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

  username: {
    type: String,
    required: [true, 'Please provide a user name.'],
    unique: true
  },

  email: {
    type: String,
    required: [true, 'Please provide a user password'],
    unique: true
  },

  password: {
    type: String,
    required: [true, 'Please provide a passwerd']
  }

})

UserSchema.pre('save', function(next) {

  const user = this

  bcrypt.hash(user.password, 10, function(error, encrypted) {

    user.password = encrypted

    next()

  })

})



module.exports = mongoose.model('User', UserSchema)