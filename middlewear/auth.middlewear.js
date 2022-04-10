const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../config/index")
const { tokenExpiredError, jsonWebTokenError, jsonWebTokenNonExistent } = require('../constant/error.type')


const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    if(!authorization){
        return ctx.app.emit('error', jsonWebTokenNonExistent, ctx )
    }
    try {
        const user = jwt.verify(authorization, JWT_SECRET);
        ctx.state.user = user
    } catch (error) {
        const errType = error.name
        if(errType === 'TokenExpiredError') return ctx.app.emit('error', tokenExpiredError, ctx )
        if(errType === 'JsonWebTokenError') return ctx.app.emit('error', jsonWebTokenError, ctx )
    }
    await next()
}

module.exports = {
    auth
}