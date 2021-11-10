const {Schema,model} = require('mongoose')

const User = new Schema({
    name:{ type: String, required: true},
    email:{ type: String, required: true},
    avatar:{ type: String, default:''},
    password: {type: String, required: true},
    roles:[{type:String, ref:"Role"}]
})

module.exports = model("User",User)