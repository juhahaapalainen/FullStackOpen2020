import blogService from '../services/blogs'
import {setNotification} from './notificationReducer'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {

  case 'INIT_BLOGS': {
    console.log('INITBLOGS')
    console.log(action.data)
    return action.data
  }
  case 'LIKE' : {

    const id = action.data.id
    // console.log('vote id', id)
    const blogToChange = state.find(a => a.id === id)
   
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(blg => blg.id !== id ? blg : changedBlog)
  }

  case 'NEW' : {
    return [...state, action.data]
  }

  case 'DELETE': {
    return state.filter((blg) => blg.id !== action.data.id)
  }
  case 'COMMENT' : {

    const id = action.data.id
    const blogToChange = state.find(a => a.id === id)
   
    const changedBlog = {
      ...blogToChange,
      comments: blogToChange.comments.concat(action.comment)
    }
    return state.map(blg => blg.id !== id ? blg : changedBlog)
  }

  default:
    return state
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    try{
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NEW',
        data: newBlog
      })
      dispatch(setNotification(`Blog ${content.title} added`,5))
    }
    catch(error) {
      if(error.response) {
        // console.log('data',error.response.data)
        // console.log('status',error.response.status)
        // console.log('headers',error.response.headers)
        dispatch(setNotification(`Error creating blog: ${error.response.data.error}`, 5, true))
      }else if (error.request) {console.log(error.request)} 
      else {console.log('Error', error.message)}
    }
  }
}

export const likeBlog = (idToUpdate, content) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(idToUpdate, content)
    dispatch(setNotification(`You liked ${updatedBlog.title}`, 5))
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blogToDelete, history) => {
  return async dispatch => {
    await blogService.delBlog(blogToDelete.id)
    dispatch(setNotification(`Removed ${blogToDelete.title}`, 5))
    dispatch({
      type: 'DELETE',
      data: blogToDelete
    })
    history.push('/')
  }
}

export const commentBlog = (blogToComment, comment) => {
  // console.log('reducerista:', comment)
  return async dispatch => {
    try {
      const updatedBlog = await blogService.comment(blogToComment.id, comment)
      dispatch({
        type: 'COMMENT',
        data: updatedBlog,
        comment: comment.comment
      })
      dispatch(setNotification('Comment added', 5))
    }
    catch(error){
      if(error.response) {
        // console.log('data',error.response.data)
        // console.log('status',error.response.status)
        // console.log('headers',error.response.headers)
        dispatch(setNotification(`Error adding comment: ${error.response.data.error}`, 5, true))
      }else if (error.request) {console.log(error.request)} 
      else {console.log('Error', error.message)}
    }
  }
}

export default blogReducer
