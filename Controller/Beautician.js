var mongoose = require('mongoose')
var Beautician = require('../Models/beauticianSchema')
let responceCode = require('../ResponseCode/responce')
const { DBerror } = require('../service/errorHandeler');

const addBeautician = (req, res) => {

    let beauticianData = {
        ...req.body,
        createdOn: new Date()
    }

    const insertBeauticaian = new Beautician(beauticianData);
    return insertBeauticaian
        .save()
        .then((data) => {
            return res.status(responceCode.errorCode.success).json({
                status: true,
                message: 'Beauticain added successfully',
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
    addBeautician,
  
}