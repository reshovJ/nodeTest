const mongoose = require('mongoose')
let Service = require('../../Models/serviceSchema')
let responceCode = require('../../ResponseCode/responce')
const { DBerror } = require('../../service/errorHandeler')


const getService = (req, res) => {

    return Service.aggregate([
        {
            $match: {
                isDeleted: false
            }
        },
        {
            $project: {
                createdOn: 0,
                enableStatus: 0,
                isDeleted: 0,
                __v: 0,
            }
        }
    ])
    .then((data) => {
        return res.status(responceCode.errorCode.success).json({
            status: true,
            message: 'Get all the Data',
            data: data
        });
    })
    .catch((error) => {
        const errors = DBerror(error)
        return res.status(responceCode.errorCode.serverError).json({
            status: false,
            message: "Server error, Please try again later",
            error: errors,
        });
    });
}

module.exports = {
    getService
}

