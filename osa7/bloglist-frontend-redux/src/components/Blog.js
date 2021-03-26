import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
// import {setNotification} from '../reducers/notificationReducer'
import {likeBlog, deleteBlog, commentBlog} from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

const Blog = () => {
    
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blogFound = blogs.find(blg => blg.id === (id))
  const user = useSelector(state => state.user)
  const [comment, setComment] = useState('')
  const history = useHistory()
  // console.log('blog:' ,id)
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
    
  }

  const removeBlog = (event) => {
    event.preventDefault()
    // console.log('del propsblog',blogFound.id)
    dispatch(deleteBlog(blogFound, history))
    
  }

  const onSubmit = (event) => {
    event.preventDefault()
    // console.log('New comment:', comment)
  
    dispatch(commentBlog(blogFound, {comment: comment}))
      
    setComment('')
  }
  
  // console.log(blogFound)
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

      <h2>Comments</h2>

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <div>
            <Form.Label>Add comment:</Form.Label>
            <Form.Control
              type="text"
              id='comment'
              value={comment}
              name="Comment"
              onChange={({ target }) => setComment(target.value)}
            />
          
          </div>
         
          <Button variant='primary' type="submit">add comment</Button>

        </Form.Group>
      </Form>
      {blogFound.comments.map((comment, i) =>
        <li key={i}>{comment}</li>)}
    </div>
  )
}

export default Blog