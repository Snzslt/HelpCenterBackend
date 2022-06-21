const authController = require('./modules/auth/router')
const dashboard = require('./modules/Users/router')


module.exports = (app) => {

    app.use('/api/v1/auth/', authController);
    app.use('/api/v1/user/', dashboard);

}