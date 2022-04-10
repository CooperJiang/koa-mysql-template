const { PORT } = require('./config/index');

const app =require('./app/index')

app.listen( PORT , () => {
    console.log(`server start at http://localhost:${PORT} ...`);
})