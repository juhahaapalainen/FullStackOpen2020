import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = (event) => {
    event.preventDefault()
    //console.log('new', event.target.newAnecdote.value)
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(createAnecdote(content))
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