import { useState } from 'react'
import { getTraditionalHalfBirthday, getAccurateHalfBirthday } from '@seancrosby/half-birthday-calc'
import './App.css'

function App() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('00:00')
  const [results, setResults] = useState<{ traditional: string | null; accurate: string | null } | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleCompute = () => {
    if (!date) return

    const [y, m, d] = date.split('-').map(Number)
    const [h, min] = time.split(':').map(Number)
    const birthday = new Date(Date.UTC(y, m - 1, d, h, min))
    
    const traditional = getTraditionalHalfBirthday(birthday)
    const accurate = getAccurateHalfBirthday(birthday)

    setResults({
      traditional: traditional === 'none' ? 'None (Leap Year Issue)' : traditional.toLocaleDateString(undefined, { timeZone: 'UTC' }),
      accurate: accurate.toLocaleString(),
    })
    setShowResults(true)
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">1/2</h1>
        <p className="subtitle">Calculate your half birthday</p>
      </header>

      <main className="main">
        <div className="input-group">
          <label htmlFor="birthday">Birthday preceding half-birthday:</label>
          <input
            type="date"
            id="birthday"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="time">Time (Optional):</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <button className="compute-btn" onClick={handleCompute} disabled={!date}>
          Compute Half Birthday
        </button>

        <div className={`results ${showResults ? 'show' : ''}`}>
          <div className="result-card">
            <h3>Traditional</h3>
            <p className="result-value">{results?.traditional}</p>
            <span className="tooltip">Six months after the birthday.</span>
          </div>
          <div className="result-card">
            <h3>Accurate</h3>
            <p className="result-value">{results?.accurate}</p>
            <span className="tooltip">Halfway point in time between birthdays.</span>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Built with precision by Sean Crosby</p>
      </footer>
    </div>
  )
}

export default App
