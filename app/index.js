const Koa = require('koa');
const KoaBody = require("koa-body")
const parameter = require('koa-parameter');

const roter = require("../routes")
const errorHandler = require("./errorHandler")
const routerResponse = require("./resultFormatter")

const app = new Koa();
app.use(KoaBody())

app.use(parameter(app))
app.use(routerResponse())
app.use(roter.routes()).use(roter.allowedMethods())

app.on("error", errorHandler)

module.exports = app