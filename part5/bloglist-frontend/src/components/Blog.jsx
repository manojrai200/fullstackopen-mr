const Blog = ({ blog, user, updateBlog, removeBlog, view, toggleView }) => {

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
      <div>
        <span>{blog.title}</span> <span>{blog.author}</span>{" "}
        <button
          onClick={()=> {toggleView()}}
        >
          {view ? "hide" : "view"}
        </button>
      </div>
      {view && (
        <div>
          <div>
            <a href={blog.url} target="blank">
              {blog.url}
            </a>
          </div>
          <div>
            {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <button
              style={{
                backgroundColor: "#1e90ff",
                borderRadius: "4px",
                border: "none",
              }}
              onClick={handleRemove}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
