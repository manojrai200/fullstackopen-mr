import { useQuery } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    retry: false,
  })

  if (isLoading) {
    return <div>Loading anecdotes...</div>
  }

  if (isError) {
    return (
      <div>
        anecdote service not available due to problems in server
      </div>
    )
  }

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = [
    {
      content: 'If it hurts, do it more often',
      id: '47145',
      votes: 0,
    },
  ]

  return (
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
  )
}

export default App
