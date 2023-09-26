var mongoose = require('mongoose')

const beauticianSchema = new mongoose.Schema({

    name:{
        type: String,
    },
    email:{
        type: String,
    },
    Address: {
        type: String,
    },
    about: {
        type: String
    },
    phone: {
        type: Number
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

module.exports = mongoose.model('beautician', beauticianSchema);