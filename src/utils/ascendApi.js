const API_BASE = 'https://oss.exercisedb.dev/api/v1/exercises'
const CACHE_STORAGE_PREFIX = 'gritline-media-cache-'
const memoryCache = new Map()

export function normalizeText(str = '') {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function stemWord(word = '') {
  if (word.endsWith('ees')) {
    return word.slice(0, -1)
  }
  if (/(?:ss|sh|ch|[xz])es$/.test(word)) {
    return word.slice(0, -2)
  }
  return word.replace(/(?:ing|s)$/, '')
}

export function scoreExerciseMatch(candidate, exercise) {
  if (!candidate || !candidate.name || !exercise || !exercise.name) {
    return 0
  }

  const cNorm = normalizeText(candidate.name)
  const tNorm = normalizeText(exercise.name)

  if (cNorm === tNorm) {
    return 1000
  }

  const tWords = tNorm.split(' ').filter(Boolean)
  const cWords = cNorm.split(' ').filter(Boolean)

  const tStems = tWords.map(stemWord)
  const cStems = cWords.map(stemWord)

  const allTargetWordsPresent = tStems.every((tw) =>
    cStems.some((cw) => cw === tw || cw.startsWith(tw) || tw.startsWith(cw)),
  )

  if (!allTargetWordsPresent) {
    return 0
  }

  let score = 300

  if (cNorm.includes(tNorm) || cStems.join(' ').includes(tStems.join(' '))) {
    score += 200
  }

  const wordDiff = Math.abs(cWords.length - tWords.length)
  score -= wordDiff * 15

  const targetEquipment = (exercise.equipment || '').toLowerCase()
  const candidateEquipments = (candidate.equipments || []).map((e) => e.toLowerCase())

  if (targetEquipment && targetEquipment !== 'none') {
    if (
      candidateEquipments.some(
        (eq) => eq.includes(targetEquipment) || targetEquipment.includes(eq),
      ) ||
      cNorm.includes(targetEquipment)
    ) {
      score += 150
    }
  } else if (targetEquipment === 'none') {
    if (
      candidateEquipments.includes('body weight') ||
      candidateEquipments.includes('none')
    ) {
      score += 50
    }
  }

  return Math.max(score, 1)
}

export function getYouTubeEmbedUrl(urlOrId = '') {
  if (!urlOrId || typeof urlOrId !== 'string') {
    return ''
  }
  const trimmed = urlOrId.trim()
  if (!trimmed) {
    return ''
  }

  if (trimmed.includes('youtube.com/embed/')) {
    return trimmed
  }

  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`
  }

  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`
  }

  const cleanId = trimmed.replace(/[^a-zA-Z0-9_-]/g, '')
  return cleanId ? `https://www.youtube.com/embed/${cleanId}` : ''
}

function getCachedMedia(exerciseId) {
  if (!exerciseId) return null
  if (memoryCache.has(exerciseId)) {
    return memoryCache.get(exerciseId)
  }
  try {
    const raw = sessionStorage.getItem(`${CACHE_STORAGE_PREFIX}${exerciseId}`)
    if (raw) {
      const parsed = JSON.parse(raw)
      memoryCache.set(exerciseId, parsed)
      return parsed
    }
  } catch {
    return null
  }
  return null
}

function setCachedMedia(exerciseId, data) {
  if (!exerciseId) return
  memoryCache.set(exerciseId, data)
  try {
    sessionStorage.setItem(`${CACHE_STORAGE_PREFIX}${exerciseId}`, JSON.stringify(data))
  } catch {
    return
  }
}

export function clearMediaCache() {
  memoryCache.clear()
  try {
    const keysToRemove = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key && key.startsWith(CACHE_STORAGE_PREFIX)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach((k) => sessionStorage.removeItem(k))
  } catch {
    return
  }
}

export async function fetchExerciseDemo(exercise) {
  if (!exercise) {
    return null
  }

  const override = exercise.demoOverride
  if (override && override.demoUrl && typeof override.demoUrl === 'string' && override.demoUrl.trim()) {
    const trimmedUrl = override.demoUrl.trim()
    const overrideType = (override.type || 'gif').toLowerCase()
    return {
      type: overrideType === 'youtube' ? 'youtube' : 'gif',
      url: overrideType === 'youtube' ? getYouTubeEmbedUrl(trimmedUrl) : trimmedUrl,
      source: 'override',
      caption: null,
    }
  }

  if (exercise.gifUrl) {
    return {
      type: 'gif',
      url: exercise.gifUrl,
      source: 'AscendAPI',
      caption: 'Source: AscendAPI',
      matchedName: exercise.apiMatchedName || exercise.name,
    }
  }

  const cached = getCachedMedia(exercise.id)
  if (cached) {
    if (cached.unavailable) {
      return null
    }
    exercise.gifUrl = cached.url
    exercise.apiMatchedName = cached.matchedName
    return cached
  }

  const cleanName = normalizeText(exercise.name)
  const words = cleanName.split(' ')
  const singularName = words.map(stemWord).join(' ')

  const searchQueries = [singularName, cleanName]
  const uniqueQueries = [...new Set(searchQueries)]

  for (const query of uniqueQueries) {
    try {
      const url = `${API_BASE}?limit=25&name=${encodeURIComponent(query)}`
      const response = await fetch(url)
      if (!response.ok) {
        continue
      }

      const json = await response.json()
      const candidates = Array.isArray(json?.data) ? json.data : []
      if (candidates.length === 0) {
        continue
      }

      let bestCandidate = null
      let bestScore = 0

      for (const candidate of candidates) {
        const score = scoreExerciseMatch(candidate, exercise)
        if (score > bestScore) {
          bestScore = score
          bestCandidate = candidate
        }
      }

      if (bestCandidate && bestScore >= 100) {
        const result = {
          type: 'gif',
          url: bestCandidate.gifUrl,
          source: 'AscendAPI',
          caption: 'Source: AscendAPI',
          matchedName: bestCandidate.name,
          targetMuscles: bestCandidate.targetMuscles || [],
          equipments: bestCandidate.equipments || [],
          instructions: bestCandidate.instructions || [],
        }

        exercise.gifUrl = bestCandidate.gifUrl
        exercise.apiMatchedName = bestCandidate.name
        exercise.apiTargetMuscles = bestCandidate.targetMuscles || []
        exercise.apiEquipment = bestCandidate.equipments || []
        exercise.apiInstructions = bestCandidate.instructions || []
        exercise.apiSource = 'AscendAPI'

        setCachedMedia(exercise.id, result)
        return result
      }
    } catch {
      return null
    }
  }

  setCachedMedia(exercise.id, { unavailable: true })
  return null
}
