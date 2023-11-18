const BlogForm = ({ handleCreate, title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title <input type='text' id="title" value={title} name='Title' onChange={handleTitleChange} placeholder="title"/>
        </div>
        <div>
          author <input type='text' id="author" value={author} name='Author' onChange={handleAuthorChange} placeholder="author"/>
        </div>
        <div>
          url <input type='text' id="url" value={url} name='Url' onChange={handleUrlChange} placeholder="url"/>
        </div>
        <button type='submit' id="create-button">create</button>
      </form>
    </div>
  )
}

export default BlogForm