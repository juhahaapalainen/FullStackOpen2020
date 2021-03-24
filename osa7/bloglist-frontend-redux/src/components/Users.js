import React from 'react'
import { useSelector } from 'react-redux'
// import {createBlog } from '../reducers/blogReducer'

const User = (user) => {
  console.log(user.user.username)
  return (
    <tr>
      <td>{user.user.username}</td> 
      <td>{user.user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
    
  //   const dispatch = useDispatch()
  const users = useSelector(state => state.allUsers)
  
  //   console.log(users)
  return(
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th>Nimi</th>
            <th>Blogei</th>
          </tr>

          {users.map(usr => 
            <User
              key ={usr.id}
              user = {usr}
            />)
          }
        </tbody>
      </table>

      
    </div>
  )
}

export default Users