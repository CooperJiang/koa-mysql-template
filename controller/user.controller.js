const { createUser, getUserInfo, updateUserInfo } = require('../service/user.service')
const { catchError } = require('../constant/error.type')
const jwt  =require('jsonwebtoken')
const { JWT_SECRET } = require("../config/index")

class UserController {
    async register(ctx, next){
        try {
            const user = await createUser(ctx.request.body)
            const data = {  id: user.id,  user_name: user.user_name  }
            ctx.success( data, '用户注册成功')
        } catch (error) {
            console.error(error,'用户注册catchError')
            return ctx.app.emit('error', catchError, ctx)
        }
    }

    async login(ctx, next){
        const { user_name } = ctx.request.body
        ctx.body = "登录成功"
        try {
            const { password, ...other } = await getUserInfo({user_name})
            const data = { token: jwt.sign(other, JWT_SECRET, { expiresIn: '7d' })}
            ctx.success(data, '登录成功')
        } catch (error) {
            console.error(error,'用户登录catchError')
            return ctx.app.emit('error', catchError, ctx)
        }
    }

    async updatePwd(ctx) {
        const { id } = ctx.state.user
        const { password } = ctx.request.body
        try {
            const res = await updateUserInfo({ id, password })
            res && ctx.success(null,'密码修改成功')
            !res && ctx.fail('密码修改失败')
        } catch (error) {
            console.error(error,'用户修改密码catchError')
            return ctx.app.emit('error', catchError, ctx)
        }
    }

}

module.exports = new UserController()