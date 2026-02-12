const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    role: {
         type: String, 
         enum: ['customer', 'service-provider'], 
         default: 'customer' 
        },
    Date:{
        type: Date,
        default: Date.now
    }
  });
  const User = mongoose.model('User', UserSchema)
  module.exports = User