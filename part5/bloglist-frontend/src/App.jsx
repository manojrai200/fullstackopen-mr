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

  const addBlog = (blogObj) => {
    blogService.create(blogObj).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  const updateblog = (blog) => {
    const updateBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

   blogService.update(blog.id, updateBlog)
      .then(updatedBlog => {
        setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
      })
  }


  const createBlogForm = () => (
    <Togglable buttonLabel='creat new blog'>
      <CreateBlogForm
        createBlog={addBlog}
        setMessage={setMessage}
        setStatus={setStatus}
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
    <>
      <h2>blogs</h2>
      <Notification status={status} message={message} />
      <p>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {user && createBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateblog}/>
      )}
    </>
  )
}


export default App