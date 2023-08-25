import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


 

  useEffect(() => {
    blogService.getAll().then(blogs => {setBlogs(blogs), console.log(blogs)}
    )  
    
   
  
  }, [])

  

  useEffect(() => {
    
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUserInfo(user)
    }
   
  }, [])

 

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

  const handleCreate = async (event) => {
    event.preventDefault()
    const newObject = {
      title,
      author,
      url
    }

    try {
      const createBlog = await blogService.createBlog(newObject)
      console.log(createBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      
      
      
      
      
    } catch(exception) {
      console.log('error creating a blog')
    }
  } 
  
  if (userInfo === null) {
    return (
      <div>
        <h2>log in to application</h2>
        {loginForm()}
  
      </div> )
      
  }
  return (
   <div>
      
      <h2>blogs</h2>
      <p>{userInfo.name} logged in <button onClick={handleLogOut}>logout</button></p>
      
      
      <h2>create new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title <input type='text' value={title} name='Title' onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
          author <input type='text' value={author} name='Author' onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
          url <input type='text' value={url} name='Url' onChange={({target}) => setUrl(target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>
      <br />
      <div>
        
      {blogs.filter(blog => blog.user.username === userInfo.username).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>

  </div>
    
  )
}

export default App