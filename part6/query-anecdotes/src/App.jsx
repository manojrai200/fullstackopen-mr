import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/request'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './components/NotificationContext'
import { useReducer } from 'react'

const App = () => {
  const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.payload
      case 'CLEAR_NOTIFICATION':
        return ''
      default:
        return state
    }
  }

  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    '',
  )

  const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })
  const queryClient = useQueryClient()

  const upadateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  if (isLoading) {
    return <div>Loading anecdotes...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const handleVote = (anecdote) => {
    upadateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `anecdote '${anecdote.content}' voted!`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {data.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
