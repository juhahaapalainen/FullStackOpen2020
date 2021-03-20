import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const [message, setMessage] = useState(null)
  // const [blogFormVisible, setBlogFormVisible] = useState(false)  
  const blogFormRef = useRef()
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('loggin in' ,username,password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(
        'Login succesfull'
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
    setMessage(
      'Logout succesfull'
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
    username
        <input
          type="text"
          id='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
    password
        <input
          type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>

  )

  
  const addBlog =(blogObject) => {
    //event.preventDefault()
    //console.log('addblogist')
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log('addista',returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
        //setBlogFormVisible(false)
        blogFormRef.current.toggleVisibility()
        setMessage(
          `Blog '${returnedBlog.title}' added on server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage('Title and url are required')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      })

  }

  const addLike = (blogObject, idToUpdate) => {

    console.log('Lisaalike:', blogObject)
    console.log('id:', idToUpdate)
    blogService
      .update(idToUpdate, blogObject)
      .then(returnedBlog => {
        // console.log('rtrn' ,returnedBlog)
        setBlogs(blogs.map(blg => blg.id !== idToUpdate ? blg : returnedBlog))
      })
  }

  const deleleteBlog = (blogToDelete) => {

    // console.log('delete:', blogToDelete)
    
    var areUSure = confirm(`Remove blog ${blogToDelete.title}?`)
    if(areUSure) {
      blogService
        .delBlog(blogToDelete.id)
        .then(setBlogs(blogs.filter((blg) => blg.id !== blogToDelete.id)))
        .catch((error) => {
          console.log(error)
          setErrorMessage('Error deleting blog')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
  
        })
      setMessage(
        `Blog '${blogToDelete.title}' removed from server`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  
    
  }

  const blogForm = () => {
   
    return (
      
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog = {addBlog}
        />
      </Togglable>
    )
  }

  const blogList = () => {

    return(
      <div>
        {sortedBlogs
          
          .map(blog =>
        
            <Blog key={blog.id} blog={blog} makeLike={addLike} delBlog = {deleleteBlog} user={user}/>
          )}
      </div>
    )  
  }

  const sortedBlogs = [].concat(blogs)
    .sort((a, b) => a.likes < b.likes ? 1 : -1)

  return (

    
    <div>
      <ErrorNotification message={errorMessage}></ErrorNotification>
      <Notification message={message}></Notification>
      <h2>Login</h2>
      {user === null ? 
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>  
          {blogForm()}
        </div>   
      }
      <h2>blogs</h2>
      {blogList()}  
    </div>
  )
}

export default App