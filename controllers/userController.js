const User = require('../models/userModel')
const response = require('../utilities/response')
const jwt = require('jsonwebtoken')

const signToken = async (user) => {
    return await jwt.sign({ id: user._id }, 'secret')
}

module.exports.getAllUser = async (req, res) => {
    const users = await User.find()
    // return response.success(res, 200, 'success', users)
    return response.render(res, 'pages/users', { user: {}, token: 'userstoken', users })
}

module.exports.getUser = async (req, res) => {
    const _id = req.params.id
    console.log('id', _id)
    const user = await User.findOne({ _id })
    const token = await signToken(user)
    console.log('user', user)
    return response.render(res, 'pages/profile', { user, token })
}