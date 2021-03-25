import React, {  useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch,useSelector } from 'react-redux'
import {initializeBlogs} from './reducers/blogReducer'
import Users from './components/Users'
import { initializeUsers } from './reducers/allUsersReducer'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import Nav from './components/Nav'
import Login from './components/Login'

const App = () => {
  
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

  const blogForm = () => {
   
    return (
      
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm/>
      </Togglable>
    )
  }

  return (
    <div className='conainer'>
      <Router>
        <Nav></Nav>
        <Switch>
          <Route path="/users/:id">
            <Notification></Notification>
          
            <User></User>
          </Route>
          <Route path="/blogs/:id">
            <Notification></Notification>
         
            <Blog></Blog>
          </Route>
        
          <Route path = '/users'>
            <Notification></Notification>
          
            <Users></Users>
          </Route>

          <Route path="/login">
            <Login onLogin={user} />
          </Route>

          <Route path='/'>
            <Notification></Notification>
            {user ? 
              blogForm() :
              null
            }
            
            <BlogList></BlogList>
          </Route>

        
        </Switch>
      </Router>
    </div>
 
  )
}

export default App