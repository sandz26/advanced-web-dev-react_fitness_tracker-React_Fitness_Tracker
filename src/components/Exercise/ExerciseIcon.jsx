// ExerciseIcon.jsx
// Drop-in replacement for a photo <img> on your exercise cards.
// Usage: <ExerciseIcon name="Bench Press" size={48} />

import PropTypes from 'prop-types'
import { EXERCISE_ICON_MAP, CATEGORY_COLORS, DEFAULT_ICON } from './exerciseIcons'

export default function ExerciseIcon({ name, size = 48, className = '' }) {
  const entry = EXERCISE_ICON_MAP[name]
  const Icon = entry?.icon || DEFAULT_ICON
  const color = entry ? CATEGORY_COLORS[entry.category] : '#6b7280'

  return (
    <div
      className={`exercise-icon-wrap ${className}`}
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        backgroundColor: `${color}1a`, // ~10% opacity tint of the category color
        marginBottom: '0.75rem',
      }}
      aria-label={name}
      role="img"
    >
      <Icon size={size * 0.55} color={color} strokeWidth={2} />
    </div>
  )
}

ExerciseIcon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
}
