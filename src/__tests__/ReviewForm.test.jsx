import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ReviewForm from '../assets/components/ReviewForm'

describe('ReviewForm', () => {
  it('renders rating and textarea', () => {
    render(<ReviewForm recipeId={1} />)
    expect(screen.getByText('Your Rating')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('What did you think of this recipe?')).toBeInTheDocument()
  })

  it('shows error if submitted without rating', () => {
    render(<ReviewForm recipeId={1} />)
    fireEvent.click(screen.getByText('Submit Review'))
    expect(screen.getByText('Please select a rating')).toBeInTheDocument()
  })

  it('calls onSubmit with correct data', () => {
    const onSubmit = vi.fn()
    render(<ReviewForm recipeId={5} onSubmit={onSubmit} />)
    
    fireEvent.click(screen.getAllByRole('button')[2]) // 3rd star
    fireEvent.change(screen.getByPlaceholderText('What did you think of this recipe?'), {
      target: { value: 'Great recipe!' }
    })
    fireEvent.click(screen.getByText('Submit Review'))
    
    expect(onSubmit).toHaveBeenCalledWith({
      recipeId: 5,
      rating: 3,
      comment: 'Great recipe!'
    })
  })
})