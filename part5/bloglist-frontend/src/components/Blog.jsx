const Blog = ({ blog, user, handleLike, removeBlog, view, toggleView }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showDelete = user && blog.user && blog.user.username === user.username;

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span>{blog.title}</span> <span>{blog.author}</span>{" "}
        <button
          onClick={() => {
            toggleView(blog.id);
          }}
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
            <button
              onClick={() => {
                handleLike(blog);
              }}
            >
              {"like"}
            </button>
          </div>
          <div>{blog.user.name}</div>
          {showDelete && (
            <div>
              <button
                style={{
                  backgroundColor: "#1e90ff",
                  borderRadius: "4px",
                  border: "none",
                }}
                onClick={() => {
                  removeBlog(blog);
                }}
              >
                remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
