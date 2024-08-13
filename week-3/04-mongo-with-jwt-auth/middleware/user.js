const jwt = require('jsonwebtoken');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req?.headers?.authorization.split(' ')[1];
        const decoded = jwt.verify(token, "jwt_ur234@dskjf#")
        if(decoded.username){
            req.username = decoded.username;
            next();
        }
        else res.status(403).json({message: "Token is not valid, try login again"});
    }
    else res.status(500).json({message: "No token is provided"});
}

module.exports = userMiddleware;