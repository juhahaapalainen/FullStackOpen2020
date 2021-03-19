import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
      event.preventDefault()
      //console.log('new', event.target.newAnecdote.value)
      const content = event.target.newAnecdote.value
      event.target.newAnecdote.value = ''
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(createAnecdote(newAnecdote))
      dispatch(setNotification(`you added ${content}` ))
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000)
}
    
return(
    <div>
        <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='newAnecdote'/></div>
        <button type='submit'> create</button>
      </form>
      </div>
)

}

export default AnecdoteForm
