import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  console.log('TOKENSET')
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {

  // console.log('updatesta',`${ baseUrl }/${id}`)
  // console.log('obj',newObject)

  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const delBlog = (id) => {
  // console.log('poistettava id', id)
  // console.log('poistettava url', `${ baseUrl }/${id}`)

  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${ baseUrl }/${id}`, config)
  return request.then((response) => response.data)
}

const comment = async(id, comment) => {

  console.log('servicesta:', comment)
  const response = await axios.post(`${ baseUrl }/${id}/comments`, comment)
  return response.data
}

export default { getAll, create, update, setToken, delBlog, comment }