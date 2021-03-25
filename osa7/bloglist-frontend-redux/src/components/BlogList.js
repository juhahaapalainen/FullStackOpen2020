import React from 'react'
import { useSelector } from 'react-redux'
// import {setNotification} from '../reducers/notificationReducer'
// import {deleteBlog} from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  //const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [].concat(blogs)
    .sort((a, b) => a.likes < b.likes ? 1 : -1)

  return (
    <div className ='container'>
      <h1>Blogs</h1>
      <Table striped>
        <tbody>
          { sortedBlogs.map(blog =>
            <tr key = {blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          )}
        </tbody>
      </Table>
     
    </div>
  )
    
}

export default BlogList




