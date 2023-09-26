var mongoose = require('mongoose')

const saloonSchema = new mongoose.Schema({

    name:{
        type: String,
    },
    ownerID:{
        type: mongoose.Schema.Types.ObjectId,
    },
    Address: {
        type: String,
    },
    service: [
        {
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
    createdOn: {
        type: Date,
        require: false,
    },
    updatedOn: {
        type: Date,
        require: false,
    },
    enableStatus : {
        type: Boolean,
        require: false,
        default: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('saloon', saloonSchema);