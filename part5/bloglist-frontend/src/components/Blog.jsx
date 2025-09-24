import { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
  const [showBlog, setShowBlog] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleShow = () => {
    setShowBlog(!showBlog);
  };

  const handleLike = () => {
    updateBlog(blog);
  };

  return (
    <div style={blogStyle}>
      {!showBlog && (
        <div>
          {blog.title} {blog.author} <button onClick={handleShow}>view</button>
        </div>
      )}
      {showBlog && (
        <div>
          {blog.title} <button onClick={handleShow}>hide</button> <br />
          <a href={blog.url} target="blank">
            {blog.url}
          </a>{" "}
          <br />
          likes {blog.likes}
          <button onClick={handleLike}>like</button> <br />
          {blog.author} <br />
        </div>
      )}
    </div>
  );
};

export default Blog;
