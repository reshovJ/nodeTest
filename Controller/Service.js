var mongoose = require('mongoose')
var Service = require('../Models/serviceSchema')

const addService = (req, res) => {

    let serviceData = {
        ...req.body,
        createdOn: new Date()
    }

    const insertService = new Service(serviceData);
    return insertService
        .save()
        .then((data) => {
            return res.status(200).json({
                status: true,
                message: 'Service inserted successfully',
                data: data
            })
        })
        .catch((error) => {
            return res.status(500).json({
                status: false,
                message: 'Server error, Please try again later',
                error: error
            })
        })
}


module.exports = {
    addService,
  
}