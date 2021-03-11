import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)

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
    `Login succesfull`
  );
  setTimeout(() => {
    setMessage(null);
  }, 5000);
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
    `Logout succesfull`
  );
  setTimeout(() => {
    setMessage(null);
  }, 5000);
}

const loginForm = () => (
  <form onSubmit={handleLogin}>
  <div>
    username
      <input
      type="text"
      value={username}
      name="Username"
      onChange={({ target }) => setUsername(target.value)}
    />
  </div>
  <div>
    password
      <input
      type="password"
      value={password}
      name="Password"
      onChange={({ target }) => setPassword(target.value)}
    />
  </div>
  <button type="submit">login</button>
</form>

)

const blogForm = () => (
  
  <form onSubmit={addBlog}>
    <div>
      title
      <input
      type='text'
        value={newTitle}
        name = 'title'
        onChange={({ target }) => setNewTitle(target.value)}
      />
      </div>
      <div>
        author
      <input
      type='text'
        value={newAuthor}
        name = 'author'
        onChange={({ target }) => setNewAuthor(target.value)}
      />
      </div>
      <div>
        url
      <input
      type='text'
        value={newUrl}
        name = 'url'
        onChange={({ target }) => setNewUrl(target.value)}
      />
      </div>
      <button type="submit">save</button>
  </form>  
  
)



const addBlog =(event) => {
  event.preventDefault()
  const blogObject = {
    title: newTitle,
    author: newAuthor,
    url: newUrl,
  }

  
  blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      setMessage(
        `Blog '${returnedBlog.title}' added on server`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    })
  .catch((error) => {
    console.log(error)
    setErrorMessage('Title and url are required')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

  })

}
  return (

    
    <div>
      <ErrorNotification message={errorMessage}></ErrorNotification>
      <Notification message={message}></Notification>
    
       <h2>Login</h2>
       {user === null ? 
          loginForm() :
          <div>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            <h2>add new blog</h2>
            {blogForm()}

            <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
          </div>
          
        }
      
    </div>
  )
}

export default App