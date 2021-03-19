
const notificationReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {

  case 'MSG': {
    // console.log('MSGsta', action.data)
    return state = action.data
  }
  case 'RMV': {

    return state = null
  }
  default:
    return state
  }


}

export const setNotification = message => {
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


export default notificationReducer