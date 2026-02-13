const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProvidedServiceSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    availability:{
        type: String, 
        enum: ['Yes', 'No'], 
        default: 'Yes'
    },
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    created_at:{
        type: Date,
        default: Date.now
    }
  });
  const Provided_services = mongoose.model('provided-services', ProvidedServiceSchema)
  module.exports = Provided_services


const RequestedServiceSchema = new Schema({
    service:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'provided-services'
    },
    status:{
        type: String,
        enum: ['requested', 'confirmed',"cancelled","completed"], 
        default: 'requested'
    },
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
  });
  const Requested_services = mongoose.model('requested-services', RequestedServiceSchema)
  module.exports = Requested_services