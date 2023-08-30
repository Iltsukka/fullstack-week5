import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import '../style.css'
import Notification from './components/Notification'
// import BlogForm from './components/BlogForm'
// import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  // const [addedBlog, setAddedBlog] = useState('')
  // const togglableRef = useRef()
  const [addedBlog, setAddedBlog] = useState(null)
  const [retrieveBlogs, setRetrieveBlogs] = useState(false)


 

  useEffect(() => {
    blogService.getAll().then(blogs => {setBlogs(blogs), console.log(blogs)}
    )  
    
   
  
  }, [retrieveBlogs])

  

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
    setRetrieveBlogs(!retrieveBlogs)
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
      // const filtered = blogs.filter(blog => blog.user.username === userInfo.username)
      // setBlogs(filtered)
      
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

  // const handleCreate = async (event) => {
  //   event.preventDefault()
  //   const newObject = {
  //     title,
  //     author,
  //     url
  //   }

  //   try {
  //     const createBlog = await blogService.createBlog(newObject)
  //     console.log(createBlog)
  //     setAddedBlog(createBlog)
      
  //     setNotification('success')
  //     setTimeout(() => {
  //       setNotification(null)
        
  //     }, 3000);
  //     setTitle('')
  //     setAuthor('')
  //     setUrl('')
  //     togglableRef.current.toggleVisibility()
      
      
      
      
      
  //   } catch(exception) {
  //     console.log('error creating a blog')
  //   }
  // } 
  
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
  {/* //  <div>
      
  //     <h2>blogs</h2>
  //     <Notification notification={notification} addedBlog={addedBlog}/>
  //     <p>{userInfo.name} logged in <button onClick={handleLogOut}>logout</button></p>
  //     <Togglable buttonLabel='create blog' ref={togglableRef}>
  //     <BlogForm handleCreate={handleCreate} title={title} author={author} url={url} handleAuthorChange={({target}) => setAuthor(target.value)} handleTitleChange={({target}) => setTitle(target.value) } handleUrlChange={({target}) => setUrl(target.value)}/>
  //     </Togglable> */}
      <div>
        
      {blogs.filter(blog => blog.user.username === userInfo.username).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>

    </div>
  
    
  )
}

export default App