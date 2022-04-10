module.exports = {
    userValidatorError: {
        code: 10001,
        message: "参数格式错误"
    },

    userAleadyExited: {
        code: 10002,
        message: '用户已经存在了'
    },

    catchError: {
        code: 10003,
        message: 'has a catch error'
    },

    userDoesNotExist: {
        code: 10004,
        message: '用户不存在！'
    },

    invalidPassword: {
        code: 10005,
        message: "用户密码错误"
    },

    tokenExpiredError: {
        code: 10101,
        message: '已过期的token'
    },

    jsonWebTokenError: {
        code: 10102,
        essage: '无效的token'
    },
    
    jsonWebTokenNonExistent: {
        code: 10103,
        message: "未携带token"
    }
}