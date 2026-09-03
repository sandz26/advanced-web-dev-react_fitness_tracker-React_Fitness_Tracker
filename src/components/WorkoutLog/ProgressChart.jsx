function ProgressChart({ totals }) {
  const workouts = totals?.workouts ?? 0
  const calories = totals?.calories ?? 0

  return (
    <section>
      <p>Workouts completed: {workouts}</p>
      <p>Estimated calories: {calories}</p>
    </section>
  )
}

export default ProgressChart
