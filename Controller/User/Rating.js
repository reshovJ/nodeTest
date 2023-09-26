const mongoose = require('mongoose')
let Rating = require('../../Models/ratingSchema')
let responceCode = require('../../ResponseCode/responce')
const { DBerror } = require('../Service')

const addRating = (req, res) => {

    var check = Rating.aggregate([
        {
            $match: {
                saloonID: new mongoose.Types.ObjectId(req.body.saloonID),
                userID: req.user._id,
                isDeleted: false
            }
        },
        {
            $project: {
                _id: 1
            }
        }
    ])
    .then((data)=> {
        // console.log(data)
        
        if(data.length > 0) {
            return res.status(responceCode.errorCode.dataExist).json({
                status: false,
                message: 'You have already rated this saloon',
                data: null
            })
        } else {
            let ratingData = {
                ...req.body,
                userID: req.user._id,
                cretedOn: new Date()
            }
        
            const insertRating = new Rating(ratingData);
            return insertRating
                .save()
                .then((data) => {
                    return res.status(responceCode.errorCode.success).json({
                        status: true,
                        message: 'Rating added successfully',
                        data: data
                    })
                })
                .catch((error) => {
                    const errors = DBerror(error)
                    return res.status(responceCode.errorCode.serverError).json({
                        status: false,
                        message: "Server error, Please try again later",
                        error: error,
                    });
                })
        }

    })
    .catch((error)=> {
        const errors = DBerror(error)
        return res.status(responceCode.errorCode.serverError).json({
            status: false,
            message: "Server error, Please try again later",
            error: error,
        });
    })

   
}

module.exports = {
    addRating
}