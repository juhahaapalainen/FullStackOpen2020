import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {

  const message = useSelector(state => state.notification[0])
  const error = useSelector(state => state.notification[1])
  let clsname = 'alert alert-success'
  if(error === true) {
    clsname = 'alert alert-danger'
  }
  
  return (
    <div>
      {
        message === null ?
          null :
          <div className={clsname}>{message}</div>
      }
    </div>
  )
}

export default Notification