import React, {useState} from 'react'
// import Togglable from './Togglable'

const Blog = ({blog, makeLike}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false) 
  const show = { display: showAll ? '' : 'none' }
  const [buttonName, setButtonName] = useState('show')

  const handleButton = () => {
    if(!showAll) {
      setShowAll(true)
      setButtonName('hide')
      
    }
    else {
      setShowAll(false)
      setButtonName('show')
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

  return (

    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleButton}>{buttonName}</button>
      <div style={show}>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={addLike}>like</button> </div>
        <div>{blog.user.name}</div>       
      </div>
    </div>
  )
}
export default Blog