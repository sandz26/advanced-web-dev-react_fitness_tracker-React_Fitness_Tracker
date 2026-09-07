import { describe, expect, test, vi, beforeEach } from 'vitest'
import {
  normalizeText,
  stemWord,
  scoreExerciseMatch,
  getYouTubeEmbedUrl,
  fetchExerciseDemo,
  clearMediaCache,
} from './ascendApi'

describe('ascendApi utility', () => {
  beforeEach(() => {
    clearMediaCache()
    vi.restoreAllMocks()
  })

  test('normalizes text and stems words correctly', () => {
    expect(normalizeText('Bench Press (Barbell)!')).toBe('bench press barbell')
    expect(stemWord('squats')).toBe('squat')
    expect(stemWord('running')).toBe('runn')
    expect(stemWord('burpees')).toBe('burpee')
  })

  test('scores valid exercise matches and rejects unrelated candidates', () => {
    const exercise = { name: 'Bench Press', equipment: 'barbell' }

    const goodMatch = {
      name: 'barbell bench press',
      equipments: ['barbell'],
      gifUrl: 'https://example.com/bench.gif',
    }
    expect(scoreExerciseMatch(goodMatch, exercise)).toBeGreaterThan(200)

    const badMatch = {
      name: 'ez bar standing french press',
      equipments: ['ez barbell'],
      gifUrl: 'https://example.com/french.gif',
    }
    expect(scoreExerciseMatch(badMatch, exercise)).toBe(0)

    const badTree = {
      name: 'reclining big toe pose with rope',
      equipments: ['rope'],
    }
    expect(scoreExerciseMatch(badTree, { name: 'Tree Pose' })).toBe(0)
  })

  test('converts various YouTube URL formats into embed URLs', () => {
    expect(getYouTubeEmbedUrl('dQw4w9WgXcQ')).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
    )
    expect(getYouTubeEmbedUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
    )
    expect(getYouTubeEmbedUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
    )
    expect(getYouTubeEmbedUrl('')).toBe('')
    expect(getYouTubeEmbedUrl(null)).toBe('')
  })

  test('prioritizes manual override when present', async () => {
    const exercise = {
      id: 99,
      name: 'Custom Stretch',
      demoOverride: {
        demoUrl: 'dQw4w9WgXcQ',
        type: 'youtube',
      },
    }

    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const result = await fetchExerciseDemo(exercise)

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(result).toEqual({
      type: 'youtube',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      source: 'override',
      caption: null,
    })
  })

  test('uses cached GIF from exercise data without calling API', async () => {
    const exercise = {
      id: 98,
      name: 'Bench Press',
      gifUrl: 'https://static.exercisedb.dev/media/EIeI8Vf.gif',
      demoOverride: { demoUrl: '', type: '' },
    }

    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const result = await fetchExerciseDemo(exercise)

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(result.url).toBe('https://static.exercisedb.dev/media/EIeI8Vf.gif')
    expect(result.source).toBe('AscendAPI')
  })

  test('fetches and caches demo from AscendAPI', async () => {
    const exercise = {
      id: 97,
      name: 'Deadlift',
      equipment: 'barbell',
      demoOverride: { demoUrl: '', type: '' },
    }

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: [
          {
            exerciseId: 'deadlift123',
            name: 'barbell deadlift',
            equipments: ['barbell'],
            gifUrl: 'https://static.exercisedb.dev/media/deadlift.gif',
            targetMuscles: ['glutes', 'hamstrings'],
            instructions: ['Step 1: Stand near bar', 'Step 2: Lift bar'],
          },
        ],
      }),
    })

    const result = await fetchExerciseDemo(exercise)
    expect(result).not.toBeNull()
    expect(result.url).toBe('https://static.exercisedb.dev/media/deadlift.gif')
    expect(result.caption).toBe('Source: AscendAPI')
    expect(exercise.gifUrl).toBe('https://static.exercisedb.dev/media/deadlift.gif')
  })

  test('returns null and triggers fallback when API returns no match', async () => {
    const exercise = {
      id: 96,
      name: 'Unknown Exotic Move',
      demoOverride: { demoUrl: '', type: '' },
    }

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: [],
      }),
    })

    const result = await fetchExerciseDemo(exercise)
    expect(result).toBeNull()
  })
})
