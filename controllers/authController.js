const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const response = require('../utilities/response')
signToken = async (user) => {
    return await jwt.sign({id: user._id}, 'secret')
}
module.exports. verifyToken = (token) => {}
const  hashTo =  (plainTextPassword) => {
    const saultRound = 10;
    return bcrypt.hash(plainTextPassword, saultRound)
}
const compareTo = (plainTextPassword, dbPassword) => {
    return bcrypt.compare(plainTextPassword, dbPassword)
}

module.exports.signUp = async (req, res, next) => {
    var { name, password} = req.body;
    const user = await User.findOne({name})
    if(user)
    {
        return response.error(res, 400, 'user already exist')
    }
    password  = await  hashTo(password);
    const  newUser = await User.create({name,  password})
    const token = await signToken(newUser);
    return response.success(res, 200, 'created successfully', token)
}

module.exports.signIn = async (req, res) => {
    var { name, password} = req.body;
    const  user = await User.findOne({name})
    if(!user)
    {
        return response.error(res, 400, 'user not found')
    }

    if(!await compareTo(password, user.password))
    {
        return response.error(res, 400, 'password is incorrect')
    }

    const token = await signToken(user);
    return  response.success(res,  200, 'sign-in success',  token)
}

