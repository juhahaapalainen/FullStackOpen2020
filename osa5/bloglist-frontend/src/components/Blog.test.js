import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

test('renders title and author', () => {
  const blog = {
    title: 'Testingtitle',
    author: 'Author Test',
    
  }

  const component = render(
    <Blog blog={blog} />
  )

  const element = component.getByText(
    'Testingtitle Author Test'
  )
  expect(element).toBeDefined()

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})
 
// test('clicking the button calls event handler once', async () => {
//   const blog = {
//     title: 'Testingtitle',
//     author: 'Author Test',
//     url: 'Testi url',
//     likes: 2,
//   }
     
//   const mockHandler = jest.fn()
    
//   const component = render(
//     <Blog blog={blog} />
//   )
    
//   const txt = component.container.querySelector('div')
//   console.log(prettyDOM(txt))
    
//   const button = component.getByText('show')
  
//   fireEvent.click(button)
        
//   expect(mockHandler.mock.calls).toHaveLength(1)
// })



test('renderd title, author, url, likes', async() => {
  const blog = {
    title: 'Testingtitle',
    author: 'Author Test',
    url: 'Testi url',
    likes: 2,
  }
 
  //   const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )

  const txt = component.container.querySelector('div')
  console.log(prettyDOM(txt))

  const button = component.getByText('show')
  fireEvent.click(button)
    
  const div = component.container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('display: none')

  
})

test('likes', async() => {
  const blog = {
    title: 'Testingtitle',
    author: 'Author Test',
    url: 'Testi url',
    likes: 2,
    user: {
      _id: '35235235325'
    }
  }
   
  const mockHandler = jest.fn()
  
  const component = render(
    <Blog blog={blog} makeLike={mockHandler} />
  )
  
  //   const txt = component.container.querySelector('div')
  //   console.log(prettyDOM(txt))
  const buttonShow = component.getByText('show')
  fireEvent.click(buttonShow)

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)
      
  
  expect(mockHandler.mock.calls).toHaveLength(2)
    
})

