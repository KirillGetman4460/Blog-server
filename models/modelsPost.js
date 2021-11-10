const {Schema,model} = require('mongoose')

const Post = new Schema({
    title:{ type: String, required: true },
    desc:{ type: String,required: true},
    image: { type: String}
})

module.exports = model("Post",Post)