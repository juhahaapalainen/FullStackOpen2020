import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {userLogout} from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const Nav = () => {

  const dispatch = useDispatch()
  const padding = {
    padding: 5
  }

  const user = useSelector(state => state.user)
  // console.log(user)
  const handleLogout = (event) => {
    event.preventDefault()
   
    dispatch(userLogout())
    dispatch(setNotification('Logout succesfull', 5))
  }

  return (
    <div className='container'>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user
        ? <em>{user.username} logged in <Button onClick={handleLogout}>logout</Button></em>
        : <Link style={padding} to="/login">login</Link>
      }
    </div>
  )
}

export default Nav