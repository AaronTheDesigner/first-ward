const mongoose = require('mongoose');

const DateSchema = new mongoose.Schema({
  
  title: String,

  class: String,

  description: String,
  
  date: Number,

  day: String,

  month: String,

  time: String

})

const Date = mongoose.model('Date', DateSchema)

module.exports = Date