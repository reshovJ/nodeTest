var mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({

    saloonID:{
        type:  mongoose.Schema.Types.ObjectId,
    },
    rating:{
        type: Number,
    },
    review: {
        type: String,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('rating', ratingSchema);