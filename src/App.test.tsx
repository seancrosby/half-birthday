import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the header and input fields', () => {
    render(<App />)
    expect(screen.getByText('1/2')).toBeInTheDocument()
    expect(screen.getByLabelText(/Birthday preceding half-birthday/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Time \(Optional\)/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Compute Half Birthday/i })).toBeInTheDocument()
  })

  it('updates input values when changed', () => {
    render(<App />)
    const dateInput = screen.getByLabelText(/Birthday preceding half-birthday/i) as HTMLInputElement
    fireEvent.change(dateInput, { target: { value: '1990-01-01' } })
    expect(dateInput.value).toBe('1990-01-01')

    const timeInput = screen.getByLabelText(/Time \(Optional\)/i) as HTMLInputElement
    fireEvent.change(timeInput, { target: { value: '14:30' } })
    expect(timeInput.value).toBe('14:30')
  })

  it('displays results when compute button is clicked', () => {
    render(<App />)
    const dateInput = screen.getByLabelText(/Birthday preceding half-birthday/i)
    fireEvent.change(dateInput, { target: { value: '1990-01-01' } })

    const computeBtn = screen.getByRole('button', { name: /Compute Half Birthday/i })
    fireEvent.click(computeBtn)

    expect(screen.getByText('Traditional')).toBeInTheDocument()
    expect(screen.getByText('Accurate')).toBeInTheDocument()
  })

  it('displays correct traditional half birthday for March 15, 2026', () => {
    render(<App />)
    const dateInput = screen.getByLabelText(/Birthday preceding half-birthday/i)
    fireEvent.change(dateInput, { target: { value: '2026-03-15' } })

    const computeBtn = screen.getByRole('button', { name: /Compute Half Birthday/i })
    fireEvent.click(computeBtn)

    const traditionalHeading = screen.getByText('Traditional')
    const resultValue = traditionalHeading.parentElement?.querySelector('.result-value')
    
    expect(resultValue?.textContent).toContain('15')
    expect(resultValue?.textContent).toContain('2026')
    
    const text = resultValue?.textContent || ''
    const isSeptember = text.includes('9') || text.toLowerCase().includes('sep')
    expect(isSeptember).toBe(true)
  })
})
