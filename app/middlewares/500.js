module.exports = (app) => {
    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message,
            }
        }).send();
    })
}