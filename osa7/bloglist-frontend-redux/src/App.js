import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
// import blogService from './services/blogs'
// import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
// import { useDispatch } from 'react-redux'
import { useDispatch,useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {initializeBlogs} from './reducers/blogReducer'
import {userLogin, userLogout} from './reducers/userReducer'
import Users from './components/Users'
import { initializeUsers } from './reducers/allUsersReducer'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import User from './components/User'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

  // useEffect(() =>)

  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs( blogs )
  //   )  
  // }, [])

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedUser')
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     //setUser(user)
  //     blogService.setToken(user.token)
  //   }
  // }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('loggin in' ,username,password)
    try {
      dispatch(userLogin(username, password))
      setUsername('')
      setPassword('')
      dispatch(setNotification('Login succesfull', 5))
      
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    dispatch(userLogout())
    dispatch(setNotification('Logout succesfull', 5))
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

  
  // const addBlog =(blogObject) => {
  //   //event.preventDefault()
  //   //console.log('addblogist')
  //   blogService
  //     .create(blogObject)
  //     .then(returnedBlog => {
  //       console.log('addista',returnedBlog)
  //       setBlogs(blogs.concat(returnedBlog))
  //       //setBlogFormVisible(false)
  //       blogFormRef.current.toggleVisibility()
  //       dispatch(setNotification(`Blog '${returnedBlog.title}' added on server`, 5))
        
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       dispatch(setNotification('Title and url are required', 5))
  //     })

  // }

  // const addLike = (blogObject, idToUpdate) => {

  //   console.log('Lisaalike:', blogObject)
  //   console.log('id:', idToUpdate)
  //   blogService
  //     .update(idToUpdate, blogObject)
  //     .then(returnedBlog => {
  //       // console.log('rtrn' ,returnedBlog)
  //       setBlogs(blogs.map(blg => blg.id !== idToUpdate ? blg : returnedBlog))
  //     })
  // }

  // const deleleteBlog = (blogToDelete) => {

  //   // console.log('delete:', blogToDelete)
    
  //   var areUSure = confirm(`Remove blog ${blogToDelete.title}?`)
  //   if(areUSure) {
  //     blogService
  //       .delBlog(blogToDelete.id)
  //       .then(setBlogs(blogs.filter((blg) => blg.id !== blogToDelete.id)))
  //       .catch((error) => {
  //         console.log(error)
  //         dispatch(setNotification('Error deleting blog', 5))  
  //       })
  //     dispatch(setNotification(`Blog '${blogToDelete.title}' removed from server`, 5))
      
  //   }
  
    
  // }

  const blogForm = () => {
   
    return (
      
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          // createBlog = {addBlog}
        />
      </Togglable>
    )
  }

  // const blogList = () => {

  //   return(
  //     <div>
  //       {sortedBlogs
          
  //         .map(blog =>
        
  //           <Blog key={blog.id} blog={blog} makeLike={addLike} delBlog = {deleleteBlog} user={user}/>
  //         )}
  //     </div>
  //   )  
  // }

  // const sortedBlogs = [].concat(blogs)
  //   .sort((a, b) => a.likes < b.likes ? 1 : -1)

  return (

    <Router>

      <Switch>
        <Route path="/users/:id">
          <User></User>
        </Route>

        
        <Route path = '/users'>
          <Notification></Notification>
          <h2>Login</h2>
          <div>
            {user === null ? 
              loginForm() :
              <div>
                <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>  
                {blogForm()}
              </div>   
        
        
            }
          </div>
          <Users></Users>
        </Route>

       

        <Route path='/'>
          <Notification></Notification>
          <h2>Login</h2>
          {user === null ? 
            loginForm() :
            <div>
              <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>  
              {blogForm()}
            </div>   
          }
          <h2>blogs</h2>
          <BlogList></BlogList>
        </Route>
      </Switch>
    </Router>
    
 
  )
}

export default App