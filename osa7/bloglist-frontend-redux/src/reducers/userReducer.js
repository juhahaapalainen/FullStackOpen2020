import loginService from '../services/login'
import blogService from '../services/blogs'
import {setNotification} from './notificationReducer'

// import { useDispatch } from 'react-redux'


const userReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  // const dispatch = useDispatch()
  

  switch(action.type) {
  
  case 'LOGIN': {
    // dispatch(setNotification('Login succesfull', 5))
    
    return state = action.data
  }
  case 'LOGIN_ERROR': {
    // dispatch(setNotification('WRONG USERNAME OR PASSWOED', 5, true))
    return state = null
  }
  case 'LOGOUT': {
    
    return null
  }
  case 'INIT_USER': {
    return state = action.data
  }
  default:
    return state
  }
}
  
export const userLogin = (username, password, history) => {
  // console.log('userLogin:', username, password)
  return async dispatch => {
    try {
      const newUsr = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(newUsr)
      ) 
      blogService.setToken(newUsr.token)
      dispatch(setNotification('Login succesfull', 5))
      dispatch({
        type: 'LOGIN',
        data: newUsr,
      })
      history.push('/')
    }
    catch(error) {
      dispatch({
        type: 'LOGIN_ERROR'
      })
      if(error.response) {
        // console.log('data',error.response.data)
        // console.log('status',error.response.status)
        // console.log('headers',error.response.headers)
        dispatch(setNotification(`Error logging in: ${error.response.data.error}`, 5, true))
      }else if (error.request) {console.log(error.request)} 
      else {console.log('Error', error.message)}
    }
   
  }
}

export const userLogout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    dispatch(setNotification('Logout seuccesfull', 5))
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    // console.log(user.token)
    if(user) {
      blogService.setToken(user.token)
    }
    
    dispatch({
      type: 'INIT_USER',
      data: user
    })
  }
  
}
    
    
export default userReducer