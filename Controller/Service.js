var mongoose = require('mongoose')
var Service = require('../Models/serviceSchema')
let responceCode = require('../ResponseCode/responce')
const { DBerror } = require('../service/errorHandeler')


const addService = (req, res) => {

    let serviceData = {
        ...req.body,
        createdOn: new Date()
    }

    const insertService = new Service(serviceData);
    return insertService
        .save()
        .then((data) => {
            return res.status(responceCode.errorCode.success).json({
                status: true,
                message: 'Service inserted successfully',
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
    addService,
  
}