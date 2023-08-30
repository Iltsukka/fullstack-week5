import { useState, useRef, useEffect } from "react"
import Notification from "./Notification"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"
import blogService from '../services/blogs'
import '../../style.css'


const NewBlogForm = ({userInfo, handleLogOut, createBlog}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [addedBlog, setAddedBlog] = useState('')
  const togglableRef = useRef()


    const handleCreate = async (event) => {
        event.preventDefault()
        const newObject = {
          title,
          author,
          url
        }
        createBlog(newObject)
        setTitle('')
        setAuthor('')
        setUrl('')
        togglableRef.current.toggleVisibility()
        
    
        // try {
        //   const createBlog = await blogService.createBlog(newObject)
        //   console.log(createBlog)
        //   setAddedBlog(createBlog)
          
        //   setNotification('success')
        //   setTimeout(() => {
        //     setNotification(null)
            
        //   }, 3000);
        //   setTitle('')
        //   setAuthor('')
        //   setUrl('')
        //   togglableRef.current.toggleVisibility()
          
          
          
          
          
        // } catch(exception) {
        //   console.log('error creating a blog')
        // }
      } 

      return (
        <div>
      
        {/* <h2>blogs</h2>
        <Notification notification={notification} addedBlog={addedBlog}/> */}
        <p>{userInfo.name} logged in <button onClick={handleLogOut}>logout</button></p>
        <Togglable buttonLabel='create blog' ref={togglableRef}>
        <BlogForm handleCreate={handleCreate} title={title} author={author} url={url} handleAuthorChange={({target}) => setAuthor(target.value)} handleTitleChange={({target}) => setTitle(target.value) } handleUrlChange={({target}) => setUrl(target.value)}/>
        </Togglable>
        <div>
          
        
        </div>
  
    </div>
    )

}

export default NewBlogForm