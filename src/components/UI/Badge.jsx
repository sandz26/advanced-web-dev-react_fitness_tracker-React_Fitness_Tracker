import { useState } from 'react'
import { DIFFICULTY_COLORS } from '../../data/constants'
import { titleCase } from '../../utils/helpers'
import styles from './UI.module.css'

const Badge = ({ label, tone = 'neutral' }) => {
  const [hovered, setHovered] = useState(false)
  // Difficulty labels get a tinted chip; other labels keep the CSS module tone.
  const difficultyColor = DIFFICULTY_COLORS[label]
  const inlineStyle = difficultyColor
    ? { backgroundColor: hovered ? difficultyColor : `${difficultyColor}22`, color: difficultyColor }
    : undefined

  return (
    <span
      className={`${styles.badge} ${styles[tone] ?? ''}`}
      style={inlineStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {titleCase(label)}
    </span>
  )
}

export default Badge
