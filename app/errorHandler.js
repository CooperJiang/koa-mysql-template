const errorStatus = require("../constant/err.status")
module.exports = (err, ctx) => {
    let status = errorStatus[err.code] || 500
    ctx.status = status
    ctx.body = err;
}