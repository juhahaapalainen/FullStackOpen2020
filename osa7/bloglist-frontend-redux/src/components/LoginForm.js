// import React, {useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {userLogin, userLogout} from './reducers/userReducer'
// import { setNotification } from './reducers/notificationReducer'

// const BlogAdd = () => {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')

//   const handleLogin = async (event) => {
//     event.preventDefault()
//     // console.log('loggin in' ,username,password)
//     try {
//       dispatch(userLogin(username, password))
//       setUsername('')
//       setPassword('')
//       dispatch(setNotification('Login succesfull', 5))
          
//     } catch (exception) {
//       dispatch(setNotification('wrong username or password', 5))
//     }
//   }

//   return (
//     <form onSubmit={handleLogin}>
//       <div>
//         username
//         <input
//           type="text"
//           id='username'
//           value={username}
//           name="Username"
//           onChange={({ target }) => setUsername(target.value)}
//         />
//       </div>
//       <div>
//         password
//         <input
//           type="password"
//           id='password'
//           value={password}
//           name="Password"
//           onChange={({ target }) => setPassword(target.value)}
//         />
//       </div>
//       <button type="submit">login</button>
//     </form>
//   )


// }


// const LoginForm = () => {
   
//   const dispatch = useDispatch()
//   const user = useSelector(state => state.user)

  

//   const handleLogout = (event) => {
//     event.preventDefault()
//     setUsername('')
//     setPassword('')
//     dispatch(userLogout())
//     dispatch(setNotification('Logout succesfull', 5))
//   }

//   return (
//     <div>
//       {user === null ? 
//         BlogAdd() :
//         <div>
//           <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>  
          
//         </div>   
//       }
//     </div>
//   )
    
      
  
// }

// export default LoginForm