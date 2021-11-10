const jwt = require('jsonwebtoken');
const {secret} = require('../config');

module.exports = (userRoles) => {
    return (req, res, next) => {
        if(req.method === "OPTIONS"){
            next();
        }
        try {      
            const token = req.headers.authorization.split(' ')[1];
    
            if(!token){
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            
            const decodedData = jwt.verify(token,secret)

            decodedData.user.roles.map(role =>{
                role === userRoles ? next() : res.status(403).json({message: "У вас нет прав"})
            })
            
        } catch (error) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
   
}