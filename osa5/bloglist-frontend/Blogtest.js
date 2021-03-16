import React, {useState,useImperativeHandle} from 'react'
// import Togglable from './Togglable'

const Blog = React.forwardRef((props, ref) => {
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
  const [showDelete, setShowDelete] = useState(false)
  const deleteVisible = { display : showDelete ? '' : 'none'}

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
  
  useImperativeHandle(ref, () => {
    return {
      setDel
    }
  })

  const setDel = () => {
    setShowDelete(true)
  }

  const addLike = (event) => {
    event.preventDefault()
    const updatedLikes = props.blog.likes + 1

    const updatedObject = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      user: props.blog.user._id,
      likes: updatedLikes, 
    }
    props.makeLike(updatedObject, props.blog.id)
    
  }

  const removeBlog = (event) => {
    event.preventDefault()
    setShowDelete(user?.name === props.blog.user.name)

    props.delBlog(props.blog.id)
  }

  

  return (

    <div style={blogStyle}>
      {props.blog.title} {props.blog.author}
      
      <button onClick={handleButton}>{buttonName}</button>
      <div style={show}>
        <div>{props.blog.url}</div>
        <div>{props.blog.likes} <button onClick={addLike}>like</button> </div>
        <div>{props.blog.user.name}</div>   
        <div style = {deleteVisible}>
          
          <button onClick={removeBlog}>delete</button> 
        </div>    
      </div>
      
    </div>
  )
})

Blog.displayName = 'Blog'
export default Blog