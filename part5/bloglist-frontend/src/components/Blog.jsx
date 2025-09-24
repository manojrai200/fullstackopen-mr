import { useState } from "react";

const Blog = ({ blog, showBlog, toggleView, updateBlog, removeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    updateBlog(blog);
  };

  const handleRemove = () => {
    removeBlog(blog);
  };

  return (
    <div className="blog" style={blogStyle}>
      {!showBlog && (
        <div>
          <span>{blog.title}</span> <span>{blog.author}</span>{" "}
          <span>
            <button onClick={toggleView}>view</button>
          </span>
        </div>
      )}
      {showBlog && (
        <div>
          {blog.title} <button onClick={toggleView}>hide</button> <br />
          <a href={blog.url} target="blank">
            {blog.url}
          </a>{" "}
          <br />
          likes {blog.likes}
          <button onClick={handleLike}>like</button> <br />
          {blog.author} <br />
          <button onClick={handleRemove}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
