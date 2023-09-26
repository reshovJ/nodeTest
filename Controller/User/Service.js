const mongoose = require('mongoose')
let Service = require('../../Models/serviceSchema')
let Beautician = require('../../Models/beauticianSchema')
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

const getServiceFilterByPrice = (req, res) => {

    const minPrice = req.body.minPrice;
    const maxPrice = req.body.maxPrice;

    return Service.aggregate([
        {
            $match: {
                isDeleted: false,
                price: { $gte: minPrice, $lte: maxPrice }
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

const serviceByBeautician = (req, res) => {

    return Service.aggregate([
        {
            $match: {
                isDeleted: false
            }
        },
        {
            $lookup: {
                from: "saloons",
                localField: "_id",
                foreignField: "service",
                pipeline: [
                    {
                        $lookup: {
                            from: "beauticians",
                            localField: "ownerID",
                            foreignField: "_id",
                            pipeline: [
                                {
                                    
                                        $project: {
                                            createdOn: 0,
                                            enableStatus: 0,
                                            isDeleted: 0,
                                            __v: 0,
                                        }
                                    
                                }
                            ],
                            as: "beauticianData"
                        }
                    },
                    {
                        $project: {
                            beauticianData: 1
                        }
                    }
                ],
                as: "providedBy"
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
    getService,
    getServiceFilterByPrice,
    serviceByBeautician
}

