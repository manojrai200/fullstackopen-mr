import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ).catch(error => {
      console.log(error)
    })
  }, [])

 useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage('wrong username or password')
      setStatus('error')
      setTimeout(() => {
        setMessage(null)
        setStatus(null)
      }, 5000)
    }  
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = (e) => {
    e.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogService.create(newBlog).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    })

    setMessage(`a new blog ${title} by ${author} added`)
    setStatus('success')
    setTimeout(() => {
      setMessage('')
      setStatus(null)
    }, 5000)

  }

  const createBlogForm = () => (
    <Togglable buttonLabel='creat new blog'>
      <CreateBlogForm
        createBlog={createBlog}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        title={title}
        author={author}
        url={url}
      />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification status={status} message={message} />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification status={status} message={message} />
      <p>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {user && createBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App