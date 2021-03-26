import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {createBlog } from '../reducers/blogReducer'
import {Form, Button } from 'react-bootstrap'
// import { setNotification } from '../reducers/notificationReducer'
const BlogForm = () => {
    
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    
    const content = ({
        
      title: newTitle,
      author: newAuthor,
      url: newUrl,
          
    })

    
    dispatch(createBlog(content))
     
    
    
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  
  return(
    <div className='container'>
      <h2>add new blog</h2> 
      <Form onSubmit={addBlog}>
        
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type='text'
            id='title'
            value={newTitle}
            name = 'title'
            onChange={e => setNewTitle(e.target.value)}
          />
          <Form.Label>author</Form.Label>
          <Form.Control 
            type='text'
            id='author'
            value={newAuthor}
            name = 'author'
            onChange={e => setNewAuthor(e.target.value)}
          />

          <Form.Label>url</Form.Label>
          <Form.Control 
            type='text'
            id='url'
            value={newUrl}
            name = 'url'
            onChange={e => setNewUrl(e.target.value)}
          />

        </Form.Group>
        <Button type="submit">save</Button>
      </Form>  
    </div>
  )
}

export default BlogForm