import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  //console.log('action id', action.data)

  switch(action.type) {

  case 'INIT_ANECDOTES': {
    return action.data
  }
  case 'VOTE' : {

    const id = action.data.id
    // console.log('vote id', id)
    const anecdoteToChange = state.find(a => a.id === id)
    // console.log('UNDEF?', anecdoteToChange)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    // console.log(changedAnecdote)

    return state.map(anec => anec.id !== id ? anec : changedAnecdote)
  }

  case 'NEW' : {
    return [...state, action.data]
  }

  default:
    return state
  }
}

export const vote = (id, anecdoteToChange) => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    await anecdoteService.createVote(id, changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id: id }
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}



export default anecdoteReducer