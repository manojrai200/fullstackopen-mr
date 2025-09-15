const CreateBlogForm = (props) => {
  return (
    <div>
      <form onSubmit={props.createBlog}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={props.title}
              onChange={({ target }) => {props.setTitle(target.value)}}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={props.author}
              onChange={({ target }) => {props.setAuthor(target.value)}}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={props.url}
              onChange={({ target }) => {props.setUrl(target.value)}}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm
