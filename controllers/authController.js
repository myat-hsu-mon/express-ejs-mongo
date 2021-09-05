const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const response = require('../utilities/response')

const signToken = async (user) => {
    return await jwt.sign({ id: user._id }, 'secret')
}
module.exports.verifyToken = (token) => { }
const hashTo = (plainTextPassword) => {
    const saultRound = 10;
    return bcrypt.hash(plainTextPassword, saultRound)
}
const compareTo = (plainTextPassword, dbPassword) => {
    return bcrypt.compare(plainTextPassword, dbPassword)
}

module.exports.getSignUp = (req, res) => {
    return response.render(res, 'pages/signup')
}

module.exports.signUp = async (req, res, next) => {
    var { name, password } = req.body;
    const user = await User.findOne({ name })
    if (user) {
        // return response.error(res, 400, 'user already exist')
        return response.render(res, 'pages/error', { user: {}, token: '', error: 'User already exists' })
    }
    password = await hashTo(password);
    const newUser = await User.create({ name, password })
    console.log({ newUser })
    const token = await signToken(newUser);
    console.log('signup token', token)
    // return response.success(res, 200, 'created successfully', token)
    return response.render(res, 'pages/index', { user: newUser, token })
}

module.exports.getSignIn = (req, res) => {
    return response.render(res, 'pages/signin')
}

module.exports.signIn = async (req, res) => {
    var { name, password } = req.body;
    const user = await User.findOne({ name })
    if (!user) {
        // return response.error(res, 400, 'user not found')
        return response.render(res, 'pages/error', { user: {}, token: '', error: 'User not found' })
    }

    if (!await compareTo(password, user.password)) {
        // return response.error(res, 400, 'password is incorrect')
        return response.render(res, 'pages/error', { user: {}, token: '', error: 'Incorrect Password' })
    }

    const token = await signToken(user);
    console.log('signin token', token)
    // return response.success(res, 200, 'sign-in success', token)
    return response.render(res, 'pages/index', { user, token })
}

module.exports.signOut = (req, res) => {
    return response.render(res, 'pages/index')
}