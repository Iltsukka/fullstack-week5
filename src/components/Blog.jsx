import { useState } from "react"
const Blog = ({ blog, username, handleLikes, handleDelete }) => {
  const [show, setShow] = useState(true)
  const label = show ? 'show' : 'hide'
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 4,
  }

  // this function makes sure that it is possible to like newly created blog without refreshing page, as the id is defined in a different way
  const user = () => {
    if (blog.user.id) {
      return blog.user.id
    }
    return blog.user
  }
  const blogObject = {
    user: `${user()}`,
    likes: blog.likes + 1,
    author: `${blog.author}`,
    title: `${blog.title}`,
    url: `${blog.url}`
  }

 
   
  if (show === false) {
    return (
      <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button onClick={() => {setShow(!show)}}>{label}</button>
      </div>
      <div>{blog.url}</div>
      <div>likes: {blog.likes} <button onClick={() => handleLikes(blog.id, blogObject)}>like</button></div>
      <div>{username}</div>
      <button onClick={() => {if (confirm(`Remove blog ${blog.title}?`)) {handleDelete(blog.id, blog.title)}}}>delete blog</button>
      </div>
      )
  }
  return (
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={() => setShow(!show)}>{label}</button>
  </div>  
)}

export default Blog