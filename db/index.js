const Seauelize = require('sequelize')
const { MYSQL_HOST, MYSQL_PORT,  MYSQL_USER,  MYSQL_PWD, MYSQL_DB} = require("../config/index")

const conenctMysql = new Seauelize(MYSQL_DB,MYSQL_USER,MYSQL_PWD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: "mysql"
})


conenctMysql.authenticate().then( () => {
    console.log('mysql connect success...');
}).catch( err => {
    console.log('mysql connect error...');
})

module.exports = conenctMysql