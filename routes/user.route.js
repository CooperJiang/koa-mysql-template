const Router = require('@koa/router')
const { register, login, updatePwd } = require('../controller/user.controller')
const { userValidator  } = require("../validator/user.validator")
const { cryptPssword, verifyUser, verifyLogin } = require("../middlewear/user.middlewear")
const { auth } = require('../middlewear/auth.middlewear.js')

const router = new Router({
    prefix: "/users"
})

router.post("/register", userValidator, verifyUser, cryptPssword, register)
router.post("/login", userValidator, verifyLogin, login)
router.post("/updatePwd", auth , cryptPssword, updatePwd)

module.exports = router