import blogService from '../services/blogs'

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
    return state.map(anec => anec.id !== id ? anec : changedBlog)
  }

  case 'NEW' : {
    return [...state, action.data]
  }

  case 'DELETE': {
    return state.filter((blg) => blg.id !== action.data.id)

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
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW',
      data: newBlog
    })
  }
}

export const likeBlog = (idToUpdate, content) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(idToUpdate, content)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blogToDelete) => {
  return async dispatch => {
    await blogService.delBlog(blogToDelete.id)
    dispatch({
      type: 'DELETE',
      data: blogToDelete
    })
  }
}

export default blogReducer
