import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UsersBlogs = (user) => {

  // console.log('USR', user.user.blogs)
  return(
    <div>
      { user.user.blogs.map(blg =>
        <li className='list-group-item' key={blg.id}> {blg.title}</li>) }
    </div>
  )
}

const User = () => {
    
  const users = useSelector(state => state.allUsers)
  const id = useParams().id
  // console.log('user:' ,id)
  const userFound = users.find(usr => usr.id === (id))
  //   console.log('USER:' ,userFound)
  //   console.log('USERNAME:' ,user.username)
  if(!userFound) {
    return null
  }
  return(
    <div className='container'>
      {(userFound) ?
        <div><h1>{userFound.name}</h1>
          <h2>added blogs</h2>
          <ul className='list-group'>
            <UsersBlogs
              user={userFound}/>
          </ul>
          
        </div> 
        :
        <div></div>
      } 
    </div>
  )
}

export default User