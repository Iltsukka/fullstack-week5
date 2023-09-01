import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token

const getToken = (data) => {
  token = `Bearer ${data}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newObject) => {
  const config = {
    headers: {Authorization: token}
  }
  console.log(`token before post request is ${token}`)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const likedBlog = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, getToken, createBlog, likedBlog, deleteBlog }