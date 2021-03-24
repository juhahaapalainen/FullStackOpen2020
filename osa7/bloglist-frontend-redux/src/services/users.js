import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// const create = async newObject => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   const response = await axios.post(baseUrl, newObject, config)
//   return response.data
// }

// const update = (id, newObject) => {

//   // console.log('updatesta',`${ baseUrl }/${id}`)
//   // console.log('obj',newObject)

//   const request = axios.put(`${ baseUrl }/${id}`, newObject)
//   return request.then(response => response.data)
// }

// const delBlog = (id) => {
//   console.log('poistettava id', id)
//   console.log('poistettava url', `${ baseUrl }/${id}`)

//   const config = {
//     headers: { Authorization: token },
//   }

//   const request = axios.delete(`${ baseUrl }/${id}`, config)
//   return request.then((response) => response.data)
// }

export default { getAllUsers }