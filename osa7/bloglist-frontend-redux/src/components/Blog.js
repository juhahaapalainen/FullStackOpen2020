import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {setNotification} from '../reducers/notificationReducer'
import {likeBlog, deleteBlog} from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const Blog = () => {
    
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  console.log('blog:' ,id)
  const blogFound = blogs.find(blg => blg.id === (id))
  const user = useSelector(state => state.user)

  const addLike = (event) => {
    event.preventDefault()
    const updatedLikes = blogFound.likes + 1

    const updatedObject = {
      title: blogFound.title,
      author: blogFound.author,
      url: blogFound.url,
      user: blogFound.user._id,
      likes: updatedLikes, 
    }
    dispatch(likeBlog(blogFound.id, updatedObject))
    dispatch(setNotification(`You liked ${updatedObject.title}`, 5))
  }

  const removeBlog = (event) => {
    event.preventDefault()
    console.log('del propsblog',blogFound.id)
    dispatch(deleteBlog(blogFound))
    //delBlog(blog)
  }
  
  console.log(blogFound)
  return(
    <div className = 'container'>
      <h1>{blogFound.title} {blogFound.author}</h1>
   
      <div><a href={blogFound.url}>{blogFound.url}</a></div>
      <div>{blogFound.likes} <Button id={blogFound.title} onClick={addLike}>like</Button></div>
      <div>{blogFound.user.name}</div>
      { user === null ?
        <div></div> :
          
        user.name === blogFound.user.name ? 
          <div> <Button onClick={removeBlog}>delete</Button> </div> :
          <div></div>
      } 
    </div>
  )
}

export default Blog