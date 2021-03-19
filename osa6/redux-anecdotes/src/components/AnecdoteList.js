import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {

  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
            has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )

}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const sortedAnecdotes = [].concat(anecdotes)
    .sort((a,b) => a.votes < b.votes ? 1 : -1)
    .filter(ane => ane.content.toLowerCase().includes(filter.toLowerCase()))

  return(
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick = {() =>
            dispatch(vote(anecdote.id), dispatch(setNotification(`You voted ${anecdote.content}`)),
              setTimeout(() => {
                dispatch(removeNotification())
              }, 5000)
            )}
        />
      )}
    </div>
  )

}

export default AnecdoteList