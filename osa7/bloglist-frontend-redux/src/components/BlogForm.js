import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {createBlog } from '../reducers/blogReducer'

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
    <div>
      <h2>add new blog</h2> 
      <form onSubmit={addBlog}>
        <div>
      title
          <input
            type='text'
            id='title'
            value={newTitle}
            name = 'title'
            onChange={e => setNewTitle(e.target.value)}
          />
        </div>
        <div>
        author
          <input
            type='text'
            id='author'
            value={newAuthor}
            name = 'author'
            onChange={e => setNewAuthor(e.target.value)}
          />
        </div>
        <div>
        url
          <input
            type='text'
            id='url'
            value={newUrl}
            name = 'url'
            onChange={e => setNewUrl(e.target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default BlogForm