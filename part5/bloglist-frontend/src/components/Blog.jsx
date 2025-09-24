import { useState } from "react"
import blogService from '../services/blogs'


const Blog = ({ blog, blogs, setBlogs }) => {
  const [showBlog, setShowBlog] = useState(false)
  console.log('bloggg', blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleShow = () => {
    setShowBlog(!showBlog)
  }

  const handleLike = () => {
    const updateBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

   blogService.update(blog.id, updateBlog)
      .then(updatedBlog => {
        console.log(updatedBlog)
        setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
      })
  }


  return (
    <div style={blogStyle}>
      {!showBlog && <div>
        {blog.title} {blog.author} <button onClick={handleShow}>view</button>
      </div>}
      {showBlog && <div>
        {blog.title} <button onClick={handleShow}>hide</button> <br />
        {blog.url} <br />
        likes {blog.likes}<button onClick={handleLike}>like</button> <br />
        {blog.author} <br />
      </div>}
  </div>
)}

export default Blog