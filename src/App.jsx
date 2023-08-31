import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import '../style.css'
import Notification from './components/Notification'

import NewBlogForm from './components/NewBlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [notification, setNotification] = useState(null)
  const [addedBlog, setAddedBlog] = useState(null)

  useEffect(() => {
    if (userInfo !== null) {
      blogService.getAll().then(blogs => setBlogs(blogs.filter(blog => blog.user.username === userInfo.username)))
    }
  }, [userInfo])

  
  useEffect(() => {
    
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      blogService.getToken(user.token)
      setUserInfo(user)
    }
   
  }, [])

  const createBlog = async (blogObject) => {
    try {
    const createdBlog = await blogService.createBlog(blogObject)
    setBlogs(blogs.concat(createdBlog))
    setNotification('success')
    setAddedBlog(createdBlog)
    setTimeout(() => {
    setNotification(null)
      
    }, 3000);
    } catch(exception) {
      console.log('error creating a blog')

    }
  }

 

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userInfo = await loginService.login({username, password})
      setUserInfo(userInfo)
      setUsername('')
      setPassword('')
      console.log(`token after logging in is ${userInfo.token}`)
      blogService.getToken(userInfo.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(userInfo))
      console.log('login successful')

    } catch (error) {
      console.log('wrong credentials')
      setNotification('error')
      setTimeout(() => {
        setNotification(null)
        
      }, 2000);
      
    }

  
  }

  const loginForm = () => {
    
   return <form onSubmit={handleLogin}>
      <div>
        username 
        <input
         type='text'
         value={username}
         name='Username'
         onChange={({target}) => setUsername(target.value)}
         />
         </div>
         <div>
          password
          <input
          type='password'
          value={password}
          name='Password'
          onChange={({target}) => setPassword(target.value)}
          />
         </div>
         <button type='submit'>login</button>
    </form>
  }

  const handleLogOut = () => {
    setUserInfo(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const handleLikes = async (id, newObject) => {
    try {
    const response = await blogService.likedBlog(id, newObject)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : response))
    } catch(exception) {
      console.log('error liking a blog', exception)
    }
  }


  
  if (userInfo === null) {
    return (
      <div>
        <Notification notification={notification}/>
        <h2>log in to application</h2>
        {loginForm()}
  
      </div> )
      
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} addedBlog={addedBlog}/>
      <NewBlogForm userInfo={userInfo} handleLogOut={handleLogOut} createBlog={createBlog}/>

      <div>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} username={userInfo.username} handleLikes={handleLikes} />
      )}
      </div>

    </div>
  
    
  )
}

export default App