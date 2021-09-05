module.exports.success = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        status:  message,
        data
    })
}

module.exports.error = (res, statusCode, errorMessage) => {
    return res.status(statusCode).json({
        status: errorMessage,
    })
}