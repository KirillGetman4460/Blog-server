const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, "avatar/")
    },
    filename(req, file, cb){
        const data = moment().format('DD.MM.YYYYHH-mm-ss_SSS')
        cb(null, `${data}-${file.originalname}`)
    }
})

const typesImage = ["image/png","image/jpg","image/jpeg"]

const fileFilter = (req, file, cb) =>{
    typesImage.includes(file.mimetype) ? cb(null, true) : cb(null, false); 
}

const limits = {
    fileSize : 1024 * 1024 * 5
}

module.exports = multer({ storage,fileFilter,limits})