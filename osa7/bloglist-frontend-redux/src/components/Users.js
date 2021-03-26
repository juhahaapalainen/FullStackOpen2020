import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'


const User = (user) => {
  // console.log(user.user.username)
  return (
    <tr>
      <td><Link to={`/users/${user.user.id}`}> {user.user.username}</Link>  </td> 
      <td>{user.user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
    
  const users = useSelector(state => state.allUsers)
  //   console.log(users)
  return(
    <div className = 'container'>
      <h1>Users</h1>
      <table className='table'>
        <tbody>
          <tr>
            <th>Nimi</th>
            <th>Blogeja</th>
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