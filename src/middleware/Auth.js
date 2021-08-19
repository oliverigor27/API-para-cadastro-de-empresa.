const jwt = require("jsonwebtoken");

module.exports = {
    async verifyToken(req, res, next) {
        const token = req.headers['authorization'];
        await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                res.status(401);
                res.json({
                    error: 401,
                    message: "Error when try authenticate"
                })
            }
    
            req.userId = decoded.userId

    
            next();
        });
    }
}