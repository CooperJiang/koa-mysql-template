const {  userValidatorError } = require("../constant/error.type")

const userValidator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            user_name: { type: 'string', required: true, min: 3, max: 6 },
            password: { type: 'string', required: true, min: 6, max: 18 },
        })
    } catch (error) {
        console.error(error,'用户注册登录校验失败');
        userValidatorError.data = error
        return  ctx.app.emit("error", userValidatorError, ctx)
    }
    await next()
}

module.exports = {
    userValidator
}