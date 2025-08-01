import { useState } from 'react'

const Statisticline = (props) => {
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  return(
    <>
      <h1>statistics</h1>
      {props.good || props.neutral || props.bad ? 
      <>
        <table>
          <tbody>
            <Statisticline text='good' value={props.good} />
            <Statisticline text='neutral' value={props.neutral} />
            <Statisticline text='bad' value={props.bad} />
            <Statisticline text='all' value={props.total} />
            <Statisticline text='average' value={props.avg} />
            <Statisticline text='positive' value={props.positivePercentage + '%'} />
          </tbody>
        </table>

      </> : 'no feedback given'}
    </>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function handleGood(){
    setGood(good + 1);
  }
  function handleNeutral(){
    setNeutral(neutral + 1);
  }

  function handleBad(){
    setBad(bad + 1);
  }
  const total = good + neutral + bad;
  const avg = ((good - bad) / total).toString();
  const positivePercentage = (good / total * 100).toString();

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      
    
      <Statistics good ={good} neutral={neutral} bad={bad} total={total} avg={avg} positivePercentage={positivePercentage} />  


    </>
  )
}

export default App