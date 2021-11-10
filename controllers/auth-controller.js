const User = require('../models/modelUser')
const Role = require('../models/modelRole')
const {secret} = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')
const generateAccessToken = (user) => {// функция для генерации токена
    const payload = {user}
    return jwt.sign(payload,secret,{expiresIn:"24h"})
} 

class AuthController{
    async login(req, res) {
        try {
            const {name,password} = req.body;
    
            const user = await User.findOne({name})
    
            const validPassword = bcrypt.compareSync(password, user.password)
    
            if(!validPassword){//если пароль не верный
                return res.json({message: "Пароль не верный"})
            }
            
            const token = generateAccessToken(user)//генерируем новый token
            return res.json({token}) 
         
        } catch (error) {
            res.json({message: error})  
        }
    }
    async register(req, res) {
        try {  
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });         
            }
            const {name,email,password} = req.body;
            
            //проверка на совпадение пользователей
            const candidate = await User.findOne({name})
    
            if(candidate){//если совпадение найдено
                return res.status(400).json({message:"Пользователь с таким именем уже существует"})//вывод сообщение, что такой пользователь уже существует
            }
                const hashPassword = bcrypt.hashSync(password, 1);//кэшируем пароль
                const userRole = await Role.findOne({value:"USER"})//добавляем роль новому пользователю
                const user = await new User({name, email,password:hashPassword,roles:[userRole.value]})//создаем нового пользователя
                await user.save()//сохроняем в базу данных  
            
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (error) {
            return res.json({message: error})
        }
    }
    async upload(req,res){
        try {
            const token = req.headers.authorization.split(' ')[1];   
            const decodedData = jwt.verify(token,secret)
    
            await User.findByIdAndUpdate({_id:decodedData.user._id},{avatar:`http://localhost:3000/avatar/${req.file.filename}`})
    
            res.json({message:'upload avatar'})
    
        } catch (error) {
            res.json({message: error}) 
        }
    }
    async user(req,res){
        try { 
            res.send(await User.findById(req.user.user._id))         
        } catch (error) {
            return res.json({message: error})
        }
    }
    async users(req, res) {
        try {
            res.send(await User.find())
        } catch (error) {
            res.json({message: error})
        }
    }
}

module.exports = new AuthController();