const jwt_token = require('jsonwebtoken')
require('dotenv').config()
const roleMiddleware = (role)=>{
    return (req,res,next)=>{
        const token = req.headers['authorization']?.split(' ')[1];
        jwt_token.verify(token,process.env.secureToken,(err,data)=>{
            if(err){
               return res.status(401).json("Invalid token unathorized user")
            }
            if(role === data.role){
                next()
            }else{
                return res.status(401).json("unathorized you don't have access to this route")
            }
        })
    }
}
module.exports = roleMiddleware