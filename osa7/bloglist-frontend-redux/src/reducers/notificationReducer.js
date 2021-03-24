const notificationReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch(action.type) {

  case 'MSG': {
    return state = action.data
  }
  case 'RMV' : {
    return state=null
  }
  default:
    return state
  }
}

export const showNotification = message => {
  return{
    type: 'MSG',
    data: message
  }
}
  
export const removeNotification = () => {
  return {
    type: 'RMV'
  }
}
  
export const setNotification = (message, time) => {
  
  return dispatch => {
    dispatch(showNotification(message))
    clearTimeout()
    setTimeout(() => {
      dispatch(removeNotification())
    }, time*1000)
  }
}
  
  
export default notificationReducer