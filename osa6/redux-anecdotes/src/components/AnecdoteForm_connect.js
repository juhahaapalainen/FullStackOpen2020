import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    //console.log('new', event.target.newAnecdote.value)
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`you added ${content}`, 5)

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

const mapDispatchToProps = {
  createAnecdote, setNotification
}

export default connect(
  null,
  mapDispatchToProps,
)(AnecdoteForm)
