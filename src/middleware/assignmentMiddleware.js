const jwt_token = require('jsonwebtoken');
require('dotenv').config()

const assignmentMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json("No token provided");
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json("Token not exist");
        }

        jwt_token.verify(token, process.env.secureToken, (err, data) => {
            if (err) {
                return res.status(401).json("Invalid token, unauthorized user");
            }

            const userId = parseInt(req.params.id);
            if (requiredRole === data.role && userId === data.id) {
                return next();
            } else {
                return res.status(401).json("Unauthorized, you don't have access to this route");
            }
        });
    };
};

module.exports = assignmentMiddleware;
