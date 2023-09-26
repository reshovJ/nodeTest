var mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({

    name:{
        type: String,
    },
    price:{
        type: Number,
    },
    duration: {
        type: String,
    },
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

module.exports = mongoose.model('service', serviceSchema);