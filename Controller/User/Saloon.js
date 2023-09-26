const mongoose = require('mongoose')
let Saloon = require('../../Models/saloonSchema')
let Rating = require('../../Models/ratingSchema')
let responceCode = require('../../ResponseCode/responce')
// const { DBerror } = require('../Service')


const getSaloon = (req, res) => {

    return Saloon.aggregate([
        {
            $match: {
                isDeleted: false
            }
        },
        {
            $lookup: {
                from: 'services',
                localField: 'service',
                foreignField: '_id',
                pipeline: [
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
                ],
                as: 'serviceDetails'
            }
        },
        {
            $lookup: {
                from: 'beauticians',
                localField: 'ownerID',
                foreignField: '_id',
                pipeline: [
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
                ],
                as: 'ownerDetails'
            }
        },
        {
            $unwind: "$ownerDetails"
        },
        {
            $lookup: {
                from: 'ratings',
                localField: '_id',
                foreignField: 'saloonID',
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userID',
                            foreignField: '_id',
                            pipeline: [
                                {
                                    $project: {
                                        name: 1
                                    }
                                }
                            ],
                            as: "userData"
                        }
                    },
                    {
                        $unwind: "$userData"
                    },
                    {
                        $addFields: {
                            reviewerName: "$userData.name"
                        }
                    },
                    {
                        $project: {
                            userID: 0,
                            userData: 0,
                            saloonID: 0,
                            createdOn: 0,
                            enableStatus: 0,
                            isDeleted: 0,
                            __v: 0,
                        }
                    }
                ],
                as: 'reviewData'
            }
        },
        {
            $addFields: {
                avgRating: { $avg: "$reviewData.rating" }
            }
        },
        {
            $project: {
                createdOn: 0,
                service: 0,
                enableStatus: 0,
                isDeleted: 0,
                __v: 0
            }
        }
    ])
        .then((data) => {
            return res.status(responceCode.errorCode.success).json({
                status: true,
                message: 'Get all the Data',
                data: data
            })
        })
        .catch((error) => {
            return res.status(responceCode.errorCode.serverError).json({
                status: false,
                message: "Server error, Please try again later",
                error: error,
            });
        })
}

const getSaloonByRating = (req, res) => {
    const minRating = req.body.minRating;
    const maxRating = req.body.maxRating;

    return Rating.aggregate([
        {
            $group: {
                _id: "$saloonID",
                avgRating: { $avg: "$rating" }
            }
        },
        {
            $match: {
                avgRating: { $gte: minRating, $lte: maxRating }
            }
        },
        {
            $lookup: {
                from: 'saloons',
                localField: '_id',
                foreignField: '_id',
                pipeline: [
                    {
                        $lookup: {
                            from: 'services',
                            localField: 'service',
                            foreignField: '_id',
                            pipeline: [
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
                            ],
                            as: 'serviceDetails'
                        }
                    },
                    {
                        $lookup: {
                            from: 'beauticians',
                            localField: 'ownerID',
                            foreignField: '_id',
                            pipeline: [
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
                            ],
                            as: 'ownerDetails'
                        }
                    },
                    {
                        $unwind: "$ownerDetails"
                    },
                    {
                        $project: {
                            createdOn: 0,
                            enableStatus: 0,
                            isDeleted: 0,
                            __v: 0,
                            service: 0,
                            ownerID: 0
                        }
                    }

                ],
                as: "saloonData"
            },

        },

        {
            $unwind: "$saloonData"
        },
        {
            $addFields: {
                saloonName: "$saloonData.name",
                saloonAddress: "$saloonData.Address",
            }
        },
    ])
        .then((data) => {
            return res.status(responceCode.errorCode.success).json({
                status: true,
                message: 'Get all the Data',
                data: data
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(responceCode.errorCode.serverError).json({
                status: false,
                message: "Server error, Please try again later",
                error: error,
            });
        });
}


module.exports = {
    getSaloon,
    getSaloonByRating
}