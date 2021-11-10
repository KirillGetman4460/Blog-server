const Router = require('express')
const nodemailer = require('nodemailer')
const { check } = require('express-validator');
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const uploadMiddleware = require('../middleware/uploadMiddleware')
const authController = require('../controllers/auth-controller');

router.post('/register', [
        check('name').notEmpty().withMessage('Имя пользователя не должно быть пустым'),
        check('password').isLength({min:4,max:10}).withMessage('Пароль должен быть больше 4 и меньше 10 символов')
],authController.register)

router.post('/login', authController.login)

router.post('/upload',uploadMiddleware.single('avatar'),authController.upload)//router для загруски новой аватарки

router.get('/users',adminMiddleware("ADMIN"),authController.users)//router для получение пользователей

router.get("/user",authMiddleware,authController.user)

router.post("/sentEmail",(req, res) => {
        const {email} = req.body
        
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"kutuzovmaksim14@gmail.com",
                pass:"fuckyou228"
            }
        });
        console.log(email);
        const info = {
            from: 'kutuzovmaksim14@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Изменение пароля", // Subject line
            html:`<div><a href="http://localhost:8080/ChangePassword">Передите по ссылке</a></div>`
        };

        transporter.sendMail(info, (err, data) =>{
            err ? console.log(err) : console.log("email sent")
        })        
})
router.get('/change-password:email',async(req,res) =>{
    console.log(req.params);
})

module.exports = router