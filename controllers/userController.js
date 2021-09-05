const User = require('../models/userModel')
const response = require('../utilities/response')
module.exports.getAllUser = async (req, res) => {
    const users = await User.find()
    return response.success(res, 200, 'success', users)
}