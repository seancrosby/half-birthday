import { useState } from 'react'
import { getTraditionalHalfBirthday, getAccurateHalfBirthday } from '@seancrosby/half-birthday-calc'
import {
  Container,
  Header,
  InputGroup,
  ComputeButton,
  ResultCard,
  ResultsList,
  Footer
} from 'crosby-ui'
import 'crosby-ui/style.css'
import './App.css'

function App() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('00:00')
  const [results, setResults] = useState<{ traditional: string | null; traditionalDetail: string | null; accurate: string | null } | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleCompute = () => {
    if (!date) return

    const [y, m, d] = date.split('-').map(Number)
    const [h, min] = time.split(':').map(Number)
    const birthday = new Date(Date.UTC(y, m - 1, d, h, min))
    
    const traditional = getTraditionalHalfBirthday(birthday)
    const accurate = getAccurateHalfBirthday(birthday)

    setResults({
      traditional: traditional === 'none' ? 'None' : traditional.toLocaleDateString(undefined, { timeZone: 'UTC' }),
      traditionalDetail: traditional === 'none' ? 'Leap year or insufficient days in month' : null,
      accurate: accurate.toLocaleString(),
    })
    setShowResults(true)
  }

  return (
    <Container>
      <a
        href="https://github.com/seancrosby/half-birthday"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
        aria-label="GitHub Repository"
      >
        <svg
          height="32"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          aria-hidden="true"
          fill="currentColor"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </a>
      <Header logo="1/2" subtitle="Calculate your half birthday" />

      <main className="main">
        <InputGroup
          label="Birthday preceding half-birthday:"
          id="birthday"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <InputGroup
          label="Time (Optional):"
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <ComputeButton onClick={handleCompute} disabled={!date}>
          Compute Half Birthday
        </ComputeButton>

        <ResultsList show={showResults}>
          <ResultCard
            title="Traditional"
            value={results?.traditional}
            detail={results?.traditionalDetail}
            tooltip="Six months after the birthday."
          />
          <ResultCard
            title="Accurate"
            value={results?.accurate}
            tooltip="Halfway point in time between birthdays."
          />
        </ResultsList>
      </main>

      <Footer text="Built with precision by Sean Crosby" />
    </Container>
  )
}

export default App
