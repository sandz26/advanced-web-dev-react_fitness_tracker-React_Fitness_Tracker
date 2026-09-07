import { fireEvent, screen } from '@testing-library/react'
import { Route, Routes } from 'react-router'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import ExerciseDetail from './ExerciseDetail'
import { renderWithRouter } from '../../test-utils'
import { exercisesData } from '../../data/exercisesData'
import { clearMediaCache } from '../../utils/ascendApi'

describe('ExerciseDetail', () => {
  beforeEach(() => {
    clearMediaCache()
    vi.restoreAllMocks()
    exercisesData.forEach((ex) => {
      delete ex.gifUrl
      delete ex.apiMatchedName
    })
  })

  test('shows a fallback when the exercise id is unknown', () => {
    renderWithRouter(
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
      </Routes>,
      { route: '/exercises/999' },
    )
    expect(screen.getByText('Exercise not found')).toBeInTheDocument()
  })

  test('renders a known exercise and shows loading skeleton while API call is in flight', () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => new Promise(() => {}))

    renderWithRouter(
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
      </Routes>,
      { route: '/exercises/8' },
    )

    expect(screen.getByRole('heading', { name: 'Bench Press' })).toBeInTheDocument()
    expect(screen.getByTestId('media-skeleton')).toBeInTheDocument()
  })

  test('renders AscendAPI fetched GIF and Source: AscendAPI caption when match succeeds', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: [
          {
            exerciseId: 'bench123',
            name: 'barbell bench press',
            equipments: ['barbell'],
            gifUrl: 'https://static.exercisedb.dev/media/EIeI8Vf.gif',
            targetMuscles: ['pectorals'],
          },
        ],
      }),
    })

    renderWithRouter(
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
      </Routes>,
      { route: '/exercises/8' },
    )

    const img = await screen.findByRole('img', { name: 'Bench Press demonstration' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://static.exercisedb.dev/media/EIeI8Vf.gif')
    expect(screen.getByText('Source: AscendAPI')).toBeInTheDocument()
  })

  test('falls back to ExerciseIcon with "Demo not available yet" when API has no match', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: [],
      }),
    })

    renderWithRouter(
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
      </Routes>,
      { route: '/exercises/10' },
    )

    const fallback = await screen.findByTestId('media-fallback')
    expect(fallback).toBeInTheDocument()
    expect(screen.getByText('Demo not available yet')).toBeInTheDocument()
  })

  test('renders YouTube iframe directly when manual demoOverride is set to youtube', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const target = exercisesData.find((ex) => ex.id === 17)
    target.demoOverride = {
      demoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube',
    }

    renderWithRouter(
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
      </Routes>,
      { route: '/exercises/17' },
    )

    expect(fetchSpy).not.toHaveBeenCalled()

    const iframe = screen.getByTitle('Downward Dog demonstration')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ')

    target.demoOverride = { demoUrl: '', type: '' }
  })

  test('renders GIF image directly when manual demoOverride is set to gif', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const target = exercisesData.find((ex) => ex.id === 19)
    target.demoOverride = {
      demoUrl: 'https://example.com/cat-cow.gif',
      type: 'gif',
    }

    renderWithRouter(
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
      </Routes>,
      { route: '/exercises/19' },
    )

    expect(fetchSpy).not.toHaveBeenCalled()
    const img = screen.getByRole('img', { name: 'Cat-Cow demonstration' })
    expect(img).toHaveAttribute('src', 'https://example.com/cat-cow.gif')

    target.demoOverride = { demoUrl: '', type: '' }
  })

  test('handles Add to Workout Plan modal and navigation', async () => {
    const handleAdd = vi.fn()
    renderWithRouter(
      <Routes>
        <Route
          path="/exercises/:id"
          element={<ExerciseDetail workoutPlan={{ Monday: [] }} onAddToPlan={handleAdd} />}
        />
        <Route path="/workout-planner" element={<p>Workout Planner Page</p>} />
        <Route path="/exercises/2" element={<p>Exercise 2</p>} />
      </Routes>,
      { route: '/exercises/1' },
    )

    fireEvent.click(screen.getByText('Next Exercise'))
    expect(screen.getByText('Exercise 2')).toBeInTheDocument()
  })

  test('confirms adding exercise to selected day from modal', async () => {
    const handleAdd = vi.fn()
    renderWithRouter(
      <Routes>
        <Route
          path="/exercises/:id"
          element={<ExerciseDetail workoutPlan={{ Monday: [] }} onAddToPlan={handleAdd} />}
        />
        <Route path="/workout-planner" element={<p>Workout Planner Page</p>} />
      </Routes>,
      { route: '/exercises/1' },
    )

    fireEvent.click(screen.getByText('Add to Workout Plan'))
    expect(screen.getByText('Add to weekly plan')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Confirm add'))
    expect(handleAdd).toHaveBeenCalledWith('Monday', expect.objectContaining({ id: 1 }))
    expect(screen.getByText('Workout Planner Page')).toBeInTheDocument()
  })
})
