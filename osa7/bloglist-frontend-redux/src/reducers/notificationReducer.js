const notificationReducer = (state = [null, false], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch(action.type) {

  case 'MSG': {
    return state = [action.data, action.error]
  }
  case 'RMV' : {
    return state= [null, false]
  }
  default:
    return state
  }
}

export const showNotification = (message, error) => {
  return{
    type: 'MSG',
    data: message,
    error: error
  }
}
  
export const removeNotification = () => {
  return {
    type: 'RMV'
  }
}
  
export const setNotification = (message, time, error) => {
  
  return dispatch => {
    dispatch(showNotification(message, error))
    clearTimeout()
    setTimeout(() => {
      dispatch(removeNotification())
    }, time*1000)
  }
}
  
  
export default notificationReducer