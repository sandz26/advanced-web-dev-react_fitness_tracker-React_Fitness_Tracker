import PropTypes from 'prop-types'
import { useState } from 'react'
import { DIFFICULTY_COLORS } from '../../data/constants'
import { titleCase } from '../../utils/helpers'
import styles from './UI.module.css'

const Badge = ({ label, tone = 'neutral' }) => {
  const [hovered, setHovered] = useState(false)
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

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  tone: PropTypes.string,
}

export default Badge
