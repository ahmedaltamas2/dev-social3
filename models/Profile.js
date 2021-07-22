const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //user id
    ref: 'user'
  },
 
  skills: {
    type: [String], //array of strings
    required: true
  }

 
});

module.exports = mongoose.model('profile', ProfileSchema);
