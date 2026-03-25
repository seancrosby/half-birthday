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

    const resultValue = screen.getByTestId('traditional-value')
    
    expect(resultValue.textContent).toContain('15')
    expect(resultValue.textContent).toContain('2026')
    
    const text = resultValue.textContent || ''
    const isSeptember = text.includes('9') || text.toLowerCase().includes('sep')
    expect(isSeptember).toBe(true)
  })

  it('handles February 29th birthdays correctly', () => {
    render(<App />)
    const dateInput = screen.getByLabelText(/Birthday preceding half-birthday/i)
    // Feb 29, 2024 was a leap year
    fireEvent.change(dateInput, { target: { value: '2024-02-29' } })

    const computeBtn = screen.getByRole('button', { name: /Compute Half Birthday/i })
    fireEvent.click(computeBtn)

    // Traditional should be "None" with detail "Leap year or insufficient days in month"
    const tradResult = screen.getByTestId('traditional-value')
    expect(tradResult.textContent).toBe('None')
    
    const tradDetail = screen.getByTestId('traditional-detail')
    expect(tradDetail.textContent).toBe('Leap year or insufficient days in month')

    // Accurate should have a date
    const accResult = screen.getByTestId('accurate-value')
    expect(accResult.textContent).not.toBe('')
  })

  it('handles October 31st birthdays correctly', () => {
    render(<App />)
    const dateInput = screen.getByLabelText(/Birthday preceding half-birthday/i)
    fireEvent.change(dateInput, { target: { value: '2025-10-31' } })

    const computeBtn = screen.getByRole('button', { name: /Compute Half Birthday/i })
    fireEvent.click(computeBtn)

    const tradResult = screen.getByTestId('traditional-value')
    expect(tradResult.textContent).toBe('None')

    const tradDetail = screen.getByTestId('traditional-detail')
    expect(tradDetail.textContent).toBe('Leap year or insufficient days in month')
  })
})
