import styles from './UI.module.css'

function SearchBar({ value, onChange, placeholder = 'Search exercises...' }) {
  return (
    <label className={styles.search}>
      <span className={styles.srOnly}>Search</span>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  )
}

export default SearchBar
