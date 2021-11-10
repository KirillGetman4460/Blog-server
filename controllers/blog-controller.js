const Post = require('../models/modelsPost')

class BlogController{

    async addPost(req, res){
        try {
            const {title,desc,image} = req.body;
    
            const post = await new Post({title,desc,image})
    
            await post.save()
    
            return res.json({message:"Post was created"})
    
        } catch (error) {
            res.send({message: "Error"})
        }

        res.json({message:"New post created"})
    }

    async postList(req, res){
        res.json(await Post.find())
    }

    async pagePost(req, res){
        const {id} = req.params
        const post = await Post.findById(id)

        res.json(post)
    }

    async removePost(req, res){
        await Post.findByIdAndDelete({_id:req.body.id})
        res.json({message:'Post was delete'})
    }

}

module.exports = new BlogController();