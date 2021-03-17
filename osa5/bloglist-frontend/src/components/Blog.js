import React, {useState,useImperativeHandle} from 'react'
import PropTypes from 'prop-types'
// import Togglable from './Togglable'

const Blog = React.forwardRef((props, ref) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const user =  JSON.parse(window.localStorage.getItem('loggedUser'))
  const [showAll, setShowAll] = useState(false) 
  const show = { display: showAll ? '' : 'none' }
  const [buttonName, setButtonName] = useState('show')
  const [showDelete, setShowDelete] = useState((user?.name === props.blog?.user?.name))
  const deleteVisible = { display : showDelete ? '' : 'none'}

  const handleButton = () => {
    if(!showAll) {
      setShowAll(true)
      setButtonName('hide')
      setShowDelete(user?.name === props.blog?.user?.name)
    }
    else {
      setShowAll(false)
      setButtonName('show')
      setShowDelete(user?.name === props.blog?.user?.name)
    }
  } 
  
  useImperativeHandle(ref, () => {
    return {
      setDel
    }
  })

  const setDel = () => {
    //console.log('toimiiko')
    // setShowAll(false)
    // setButtonName('show')
    setShowDelete(user?.name === props.blog.user.name)
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
    setShowDelete(user?.name === props.blog?.user?.name)
    console.log('del propsblog',props.blog.id)
    props.delBlog(props.blog)
  }

  

  return (

    <div style={blogStyle}>
      {props.blog.title} {props.blog.author}
      
      <button onClick={handleButton}>{buttonName}</button>
      <div style={show} className='togglableContent'>
        <div>{props.blog.url}</div>
        <div>{props.blog.likes} <button id={props.blog.title} onClick={addLike}>like</button> </div>
        <div>{props.blog?.user?.name}</div>   
        <div style = {deleteVisible}>
          
          <button onClick={removeBlog}>delete</button> 
        </div>    
      </div>
      
    </div>
  )
})

Blog.propTypes={
  blog: PropTypes.object.isRequired,
}

Blog.displayName = 'Blog'
export default Blog