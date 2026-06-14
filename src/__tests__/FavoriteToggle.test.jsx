import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FavoritesToggle from '../assets/components/FavoritesToggle'

describe('FavoritesToggle', () => {
  it('renders heart icon', () => {
    render(<FavoritesToggle recipeId={1} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onToggle with true when clicked', () => {
    const onToggle = vi.fn()
    render(<FavoritesToggle recipeId={5} isFavorite={false} onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledWith(5, true)
  })

  it('shows orange when favorited', () => {
    render(<FavoritesToggle recipeId={1} isFavorite={true} />)
    expect(screen.getByRole('button').className).toContain('text-brand-orange')
  })
})