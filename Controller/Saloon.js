var mongoose = require('mongoose')
var Saloon = require('../Models/saloonSchema')

const addSaloon = (req, res) => {

    let saloonData = {
        ...req.body,
        createdOn: new Date()
    }

    const insertSaloon = new Saloon(saloonData);
    return insertSaloon
        .save()
        .then((data) => {
            return res.status(200).json({
                status: true,
                message: 'Saloon added successfully',
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
    addSaloon,
  
}