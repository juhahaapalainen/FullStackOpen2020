import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = JSON.parse(window.localStorage.getItem('loggedUser')), action) => {
  console.log('state now: ', state)
  console.log('action', action)
    
  switch(action.type) {
  
  case 'LOGIN': {
    return state = action.data
  }
  case 'LOGOUT': {

    return null
  }
  default:
    return state
  }
}
  
export const userLogin = (username, password) => {
  console.log('userLogin:', username, password)
  return async dispatch => {
    const newUsr = await loginService.login({username, password})
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(newUsr)
    ) 
    blogService.setToken(newUsr.token)
    dispatch({
      type: 'LOGIN',
      data: newUsr,
    })
  }
}

export const userLogout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT'
    })
  }
}
    
    
export default userReducer