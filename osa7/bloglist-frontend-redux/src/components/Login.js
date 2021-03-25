import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {userLogin} from '../reducers/userReducer'
import {setNotification} from '../reducers/notificationReducer'
import {Form, Button } from 'react-bootstrap'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    try {
      dispatch(userLogin(username, password))
      setUsername('')
      setPassword('')
      dispatch(setNotification('Login succesfull', 5))
      
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 5))
    }
    history.push('/')
  }
  
  return (
    <div className='container'>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <div>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              id='username'
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          
          </div>
          <div>
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              id='password'
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
           
          </div>
          <Button variant='primary' type="submit">login</Button>

        </Form.Group>
        
      </Form>
    </div>
  )
}
export default Login    
