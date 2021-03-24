import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// import {createBlog } from '../reducers/blogReducer'

const UsersBlogs = (user) => {

  console.log('USR', user.user.blogs)
  return(
    <div>
      {  }
    </div>
  )
}

const User = () => {
    
  //   const dispatch = useDispatch()
  const users = useSelector(state => state.allUsers)
  const id = useParams().id
  console.log('user:' ,id)
  const userFound = users.find(usr => usr.id === (id))
  //   console.log('USER:' ,userFound)
  //   console.log('USERNAME:' ,user.username)
  return(
    <div>
      <h1>USER</h1>
      {(userFound) ?
        <div>{userFound.name}
          <UsersBlogs
            user={userFound}/>
        </div> 
        :
        <div></div>
     

      }
      
      

      
    </div>
  )
}

export default User

// {user.map(usr => 
//     <UsersBlogs
//       key ={usr.id}
//       user = {usr}
//     />)
//   }