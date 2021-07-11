const sendResponse = (res, msg, status) => {
    return res.json({
        message: msg,
        status: status
    })
}

module.exports = { sendResponse }
