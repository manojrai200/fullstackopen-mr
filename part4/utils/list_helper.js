const blogsRouter = require("../controllers/blogs")
const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 1){
        return blogs[0].likes
    }
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) =>
        blog.likes > max.likes ? blog : max
    )
}
 
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}