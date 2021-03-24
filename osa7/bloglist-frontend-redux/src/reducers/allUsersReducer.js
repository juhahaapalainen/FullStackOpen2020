// import users from '../services/users'
import userService from '../services/users'

const allUsersReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {

  case 'INIT_USERS': {
    // console.log('INIT USERSISTA')
    // console.log(action.data)
    return action.data
  }
  
  default:
    return state
  }
}
export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}



export default allUsersReducer
