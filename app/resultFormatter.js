const errorStatus = require("../constant/err.status")


/**
 * @desc 统一返回格式
 */
 function routerResponse(option={}){
    return async function(ctx,next){
        ctx.success = function (data, msg) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code : option.successCode || 0,
                message : msg || option.successMsg || '操作成功',
                data : data
            }
        }
 
        ctx.fail = function (message,code) {
            ctx.type = option.type || 'json'
            let status = errorStatus[err.code] || 400
            ctx.status = status
            ctx.body = {
                code : code || option.failCode || 400,
                message : message || option.successMsg || '操作失败',
                data: null
            }
        }
 
        await next()
    }
 
}
 
 
module.exports= routerResponse