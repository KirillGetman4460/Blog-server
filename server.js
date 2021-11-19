const express = require('express')
const routerPost = require('./router/router')
const routerAuth = require('./router/routerAuth')
const mongoose = require('mongoose');
const middleware = require('./middleware/cors.middleware')
const path = require('path')

const PORT = 3000

const app = express()

app.use(middleware)
    
app.use(express.json())

app.use('/avatar', express.static(path.join(__dirname,"avatar")))

app.use("/blog/posts",routerPost)

app.use("/auth",routerAuth)

const start = async () => {
    try {

        await mongoose.connect("mongodb+srv://Kirill:appdata@cluster0.s5rpm.mongodb.net/Blog?retryWrites=true&w=majority",{ 
            useNewUrlParser:true, useUnifiedTopology:true 
        })


        app.get('/',(req,res) => {
            res.send("Hello world")
        })

        app.listen(PORT, () => console.log("Server is running at port:",PORT))    

    }catch (err) {
        console.log(err);
    }
}

start()