const Router = require('express')

const blogController = require('../controllers/blog-controller');
const router = new Router()

router.post('/post', blogController.addPost)

router.get('/postlist',blogController.postList)

router.get('/post/:id', blogController.pagePost)

router.post("/remove", blogController.removePost)

module.exports = router