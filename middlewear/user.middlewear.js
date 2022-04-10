const bcrypt = require('bcryptjs');
const { getUserInfo } = require('../service/user.service');
const {  userAleadyExited, userDoesNotExist, catchError, invalidPassword } = require("../constant/error.type")

const cryptPssword = async (ctx, next) => {
    const { password } = ctx.request.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash    
    await next()
}

const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body
    if(await getUserInfo({ user_name })){
        ctx.app.emit("error", userAleadyExited, ctx)
        return;
    }
    await next()
}


const verifyLogin = async (ctx, next) => {
    const {user_name, password} = ctx.request.body
    try {
        const user = await getUserInfo({user_name})
        if(!user){
            console.error(`用户登录：用户名不存在: ${user_name}`)
            return ctx.app.emit('error', userDoesNotExist, ctx)
        }
        if(!bcrypt.compareSync(password, user.password)){
            console.error('用户密码错误')
            return ctx.app.emit('error',invalidPassword, ctx )
        }
        
    } catch (error) {
        console.error("用户登录验证错误", error)
        return ctx.app.emit('error',catchError, ctx )
    }
    await next()
}


module.exports = {
    cryptPssword,
    verifyUser,
    verifyLogin
}