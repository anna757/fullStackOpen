import { useState } from 'react'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)

const Statistics = ({ good, bad, neutral, total }) => {
  if (total > 0) return (
    <div>
      <table>
        <thead>
          <tr>
            <td><h1>statistics</h1></td>
          </tr>
        </thead>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'total feedback'} value={total} />
          <StatisticLine text={'average score'} value={(good - bad) / total} />
          <StatisticLine text={'positive'} value={(good / total) * 100 + '%'} />
        </tbody>
      </table>
    </div>
  )
  else return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const StatisticLine = ({ text, value }) => (
  <>
    <tr>
      <td><b>{text}</b></td>
      <td><b>{value}</b></td>
    </tr>
  </>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1);
  const total = good + neutral + bad;
  return (
    <div>
      <h1> give feedback </h1>
      <Button onClick={handleGoodClick} text={'good'} />
      <Button onClick={handleNeutralClick} text={'neutral'} />
      <Button onClick={handleBadClick} text={'bad'} />
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>

  )
}

export default App