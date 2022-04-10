const UserModel = require("../model/user.model")

class UserService {
    async createUser(userInfo){
        return await UserModel.create(userInfo)
    }

    async getUserInfo({ id, user_name, password, email }){
        let where = {}
        id && Object.assign( where, { id })
        user_name && Object.assign( where, { user_name })
        password && Object.assign( where, { password })
        email && Object.assign( where, { email })

        const user = await UserModel.findOne({
            attributes: ['id', 'user_name', 'password', 'email', 'role'],
            where,
            raw: true
        })

        return user || null
    }

    async updateUserInfo({ id, user_name, password, email,  role }){
        const newUser = {}
        user_name && Object.assign( newUser, { user_name })
        password && Object.assign( newUser, { password })
        email && Object.assign( newUser, { email })
        role && Object.assign( newUser, { role })
        const res = await UserModel.update(newUser, {where: { id }})
        return res[0] 
    }
}

module.exports = new UserService()