import React, {useState} from 'react'
// import Togglable from './Togglable'

const Blog = ({blog, makeLike, delBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const user =  JSON.parse(window.localStorage.getItem('loggedUser'))
  const [showAll, setShowAll] = useState(false) 
  const show = { display: showAll ? '' : 'none' }
  const [buttonName, setButtonName] = useState('show')
  const [showDelete, setShowDelete] = useState(user?.name === blog.user.name)
  const deleteVisible = { display : showDelete ? '' : 'none'}
  

  const handleButton = () => {
    if(!showAll) {
      setShowAll(true)
      setButtonName('hide')
      setShowDelete(user?.name === blog.user.name)
    }
    else {
      setShowAll(false)
      setButtonName('show')
      setShowDelete(user?.name === blog.user.name)
    }
  } 

  const addLike = (event) => {
    event.preventDefault()
    const updatedLikes = blog.likes + 1

    const updatedObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user._id,
      likes: updatedLikes, 
    }
    makeLike(updatedObject, blog.id)
    
  }

  const removeBlog = (event) => {
    event.preventDefault()
    

    delBlog(blog)
  }

  

  return (

    <div style={blogStyle}>
      {blog.title} {blog.author}
      
      <button onClick={handleButton}>{buttonName}</button>
      <div style={show}>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={addLike}>like</button> </div>
        <div>{blog.user.name}</div>   
        <div style = {deleteVisible}>
          
          <button onClick={removeBlog}>delete</button> 
        </div>    
      </div>
      
    </div>
  )
}
export default Blog