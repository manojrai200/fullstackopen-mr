import { useState } from "react"

const Blog = ({ blog }) => {
  const [showBlog, setShowBlog] = useState(false)

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
  return (
    <div style={blogStyle}>
      {!showBlog && <div>
        {blog.title} {blog.author} <button onClick={handleShow}>view</button>
      </div>}
      {showBlog && <div>
        {blog.title} <button onClick={handleShow}>hide</button> <br />
        {blog.url} <br />
        likes {blog.likes}<button>like</button> <br />
        {blog.author} <br />
      </div>}
  </div>
)}

export default Blog