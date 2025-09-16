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
    const grouped = _.groupBy(blogs, 'author')
    const countAuthorLikes = _.map(grouped, (authorBlogs, author) => ({
        author: author,
        likes: _.sumBy(authorBlogs, 'likes')
    }))

    return _.maxBy(countAuthorLikes, 'likes')
}
 
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}