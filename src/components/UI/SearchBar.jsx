import { useState } from 'react'
import styles from './UI.module.css'

const SearchBar = ({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Search exercises...',
}) => {
  const [focused, setFocused] = useState(false)

  const handleChange = (event) => {
    onChange?.(event.target.value, event)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit?.(value, event)
  }

  return (
    <form
      className={`${styles.search} ${focused ? styles.searchFocused : ''}`}
      onSubmit={handleSubmit}
    >
      <label>
        <span className={styles.srOnly}>Search</span>
        <input
          type="search"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.currentTarget.blur()
            }
          }}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar
