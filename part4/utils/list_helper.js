const _ = require('lodash')

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

const mostBlogs = (blogs) => {
    const blogCount = _.countBy(blogs, 'author')
    const authorCounts = _.map(blogCount, (count, author) => ({
        author: author,
        blogs: count
    }))
    return _.maxBy(authorCounts, 'blogs')
}

const mostLikes = (blogs) => {

    return
}
 
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}