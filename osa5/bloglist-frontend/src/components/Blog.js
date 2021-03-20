import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, makeLike, delBlog, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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

  const removeBlog = (event) => {
    event.preventDefault()
    console.log('del propsblog',blog.id)
    delBlog(blog)
  }

  return (

    <div style={blogStyle}>
      {blog.title} {blog.author}
      
      <button onClick={handleButton}>{buttonName}</button>
      <div style={show} className='togglableContent'>
        <div>{blog.url}</div>
        <div>{blog.likes} <button id={blog.title} onClick={addLike}>like</button> </div>
        <div>{blog.user.name}</div>   
        { user === null ?
          <div></div> :
          
          user.name === blog.user.name ? 
            <div> <button onClick={removeBlog}>delete</button> </div> :
            <div></div>
        }  
      </div> 
    </div>
  )
}

Blog.propTypes={
  blog: PropTypes.object.isRequired,
}

Blog.displayName = 'Blog'
export default Blog