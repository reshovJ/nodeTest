let mongoose = require('mongoose')
let User = require('../../Models/User');
let passwordHash = require('password-hash');
let jwt = require('jsonwebtoken');
let responceCode = require('../../ResponseCode/responce')
const { Validator } = require('node-input-validator');
const { DBerror, InputError } = require('../../service/errorHandeler');


function createToken(data) {
    return jwt.sign(data, 'RobotSmile');
}

const userRegister = async (req, res) => {

    const v = new Validator(req.body, {
        email: 'required',
        password: 'required',
        name: 'required',
    });
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res.status(responceCode.errorCode.requiredError).send({ status: false, error: v.errors, message: InputError(v.errors) });
    }

    let userData = {
        ...req.body,
        password: passwordHash.generate(req.body.password),
        token: createToken(req.body),
        createdOn: new Date(),
    };

    const userregister = await new User(userData);
    return userregister
        .save()
        .then((data) => {
            return res.status(responceCode.errorCode.success).json({
                status: true,
                success: true,
                message: 'User registered successfully',
                data: data.token,
            });
        })
        .catch((error) => {
            const errors = DBerror(error)
            res.status(responceCode.errorCode.serverError).json({
                status: false,
                message: errors,
                error: error,
            });
        });
}

const getTokenData = async (token) => {
    let userData = await User.findOne({ token: token }).exec();
    // console.log('adminData', adminData);
    return userData;
}

const login = async (req, res) => {
    const v = new Validator(req.body, {
        email: 'required',
        password: 'required'
    });
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res.status(responceCode.errorCode.requiredError).send({ status: false, error: v.errors });
    }

    User.findOne({ email: req.body.email })
        .then((data) => {
            if (data != null && data.comparePassword(req.body.password)) {
                data.password = null;
                res.status(responceCode.errorCode.success).json({
                    status: true,
                    message: 'User login successfully',
                    data: data.token,
                });
            } else {
                res.status(responceCode.errorCode.dataNotmatch).json({
                    status: false,
                    message: 'No User found',
                    data: null
                });
            }
        })
        .catch((error) => {
            const errors = DBerror(error)
            // console.log(error)
            res.status(responceCode.errorCode.serverError).json({
                status: false,
                message: errors,
                error: error,
            });
        });
}

module.exports = {
    userRegister,
    getTokenData,
    login
}