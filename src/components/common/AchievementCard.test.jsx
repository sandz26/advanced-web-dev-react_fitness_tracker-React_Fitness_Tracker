import { render, screen } from '@testing-library/react'
import AchievementCard from './AchievementCard'

describe('AchievementCard', () => {
  test('renders title, badge, description, and streak', () => {
    render(
      <AchievementCard
        title="New record"
        badgeText="Achievement"
        description="Best set of push-ups this month"
        streakDays={5}
      />,
    )
    expect(screen.getByRole('heading', { name: 'New record' })).toBeInTheDocument()
    expect(screen.getByText('Achievement')).toBeInTheDocument()
    expect(screen.getByText('Best set of push-ups this month')).toBeInTheDocument()
    expect(screen.getByText(/Streak: 5 days active/i)).toBeInTheDocument()
  })
})
