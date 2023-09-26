var mongoose = require('mongoose')
var Beautician = require('../Models/beauticianSchema')

const addBeautician = (req, res) => {

    let beauticianData = {
        ...req.body,
        createdOn: new Date()
    }

    const insertBeauticaian = new Beautician(beauticianData);
    return insertBeauticaian
        .save()
        .then((data) => {
            return res.status(200).json({
                status: true,
                message: 'Beauticain added successfully',
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
    addBeautician,
  
}