var mongoose = require('mongoose')
var Saloon = require('../Models/saloonSchema')
let responceCode = require('../ResponseCode/responce')
const { DBerror } = require('../service/errorHandeler')

const addSaloon = (req, res) => {

    let saloonData = {
        ...req.body,
        createdOn: new Date()
    }

    const insertSaloon = new Saloon(saloonData);
    return insertSaloon
        .save()
        .then((data) => {
            return res.status(responceCode.errorCode.success).json({
                status: true,
                message: 'Saloon added successfully',
                data: data
            })
        })
        .catch((error) => {
            const errors = DBerror(error)
            return res.status(responceCode.errorCode.serverError).json({
                status: false,
                message: errors,
                error: error,
            });
        })
}


module.exports = {
    addSaloon,
  
}