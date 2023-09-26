var mongoose = require('mongoose')
var passwordHash = require('password-hash');


const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
        unique: true,
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

UserSchema.methods.comparePassword = function (candidatePassword) {
    return passwordHash.verify(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema)