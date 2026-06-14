import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RatingStars from '../assets/components/RatingStars'

describe('RatingStars', () => {
  it('renders 5 stars', () => {
    const { getAllByRole } = render(<RatingStars />)
    expect(getAllByRole('button')).toHaveLength(5)
  })

  it('calls onRate when clicked', () => {
    const onRate = vi.fn()
    const { getAllByRole } = render(<RatingStars onRate={onRate} />)
    fireEvent.click(getAllByRole('button')[2])
    expect(onRate).toHaveBeenCalledWith(3)
  })

  it('shows correct number of orange stars for rating', () => {
    const { getAllByRole } = render(<RatingStars rating={3} readonly />)
    const stars = getAllByRole('button')
    expect(stars[0].className).toContain('text-brand-orange')
    expect(stars[4].className).toContain('text-gray-300')
  })
})