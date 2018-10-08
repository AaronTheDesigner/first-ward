const bcrypt = require('bcrypt')

const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({

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

AdminSchema.pre('save', function(next) {

  const user = this

  bcrypt.hash(user.password, 10, function(error, encrypted) {

    user.password = encrypted

    next()

  })

})



module.exports = mongoose.model('Admin', AdminSchema)