import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Tests of rendering blogs', () => {
  const blog = { title: 'Titteli', author: 'Kirjailija', url: 'google.com', likes: 0, user: 'id' }
  const username = 'Tsunami'

  test('title and author are rendered',  async () => {
    render(<Blog blog={blog} />)
    const element = await screen.findByText('Titteli Kirjailija')
    const url = screen.queryByText('google.com')
    const user = screen.queryByText('id')
    const likes = screen.queryByDisplayValue(0)
    expect(element).toBeDefined()
    expect(url).toBeNull()
    expect(user).toBeNull()
    expect(likes).toBeNull()
  })

  test('url, likes and user renders when "show" button is pressed', async () => {
    render(<Blog blog={blog} username={username} />)
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    const url = await screen.findByText('google.com')
    const user_name = await screen.findByText('Tsunami')
    const likes =  await screen.findByText('likes: 0')
    screen.debug()
  })

  test('liking blog two times causes event handler to register twice', async () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} handleLikes={mockHandler}/>)
    const user = userEvent.setup()
    const button_show =screen.getByText('show')
    await user.click(button_show)
    const button_like = screen.getByText('like')
    await user.click(button_like)
    await user.click(button_like)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })
}
)