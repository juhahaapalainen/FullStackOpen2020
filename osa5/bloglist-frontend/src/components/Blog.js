import React, {useState} from 'react'
// import Togglable from './Togglable'

const Blog = ({blog}) => {
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

  return (

    <div style={blogStyle}>
      
      
      {blog.title} {blog.author}
      <button onClick={handleButton}>{buttonName}</button>
      
      <div style={show}>
        <div>{blog.url}</div>
        <div>{blog.likes} <button>like</button> </div>
        <div>{blog.user.name}</div>       
      </div>
    </div>


    
  )
}
export default Blog