import { useState } from "react"
const Blog = ({ blog }) => {
  const [show, setShow] = useState(true)
  const label = show ? 'show' : 'hide'
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 4,
  }
  
  if (show === false) {
    return (
      <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button onClick={() => {setShow(!show)}}>{label}</button>
      </div>
      <div>{blog.url}</div>
      <div>likes: {blog.likes}</div>
      <div>{blog.user.username}</div>
      </div>
      )
  }
  return (
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={() => setShow(!show)}>{label}</button>
  </div>  
)}

export default Blog