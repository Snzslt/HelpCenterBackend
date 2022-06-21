const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                // return res.sendStatus(403);
                return res.status(403).send({
                    success: false,
                    message: "Forbidden",
                    statusCode: "403",
                })
            }

            req.token = token;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};