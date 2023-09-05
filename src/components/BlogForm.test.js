import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForms event handler registers when pressed', async () => {
  const mockHandler = jest.fn()
  render(<BlogForm handleCreate={mockHandler} />)
  const user = userEvent.setup()
  const input_title = screen.getByPlaceholderText('title')
  const input_author = screen.getByPlaceholderText('author')
  const input_url = screen.getByPlaceholderText('url')
  const button_submit = screen.getByText('create')
  await user.type(input_title, 'testausta')
  await user.type(input_author, 'Testimies')
  await user.type(input_url, 'testi.com')
  await user.click(button_submit)
  screen.debug()
  expect(mockHandler.mock.calls).toHaveLength(1)
})