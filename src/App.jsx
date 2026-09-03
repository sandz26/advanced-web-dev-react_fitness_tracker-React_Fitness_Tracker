import { Route, Routes } from 'react-router'
import Navbar from './components/Navigation/Navbar'
import Footer from './components/common/Footer'
import ExerciseDetail from './components/Exercise/ExerciseDetail'
import ExercisesPage from './pages/ExercisesPage'
import HistoryPage from './pages/HistoryPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProgressPage from './pages/ProgressPage'
import WorkoutPlannerPage from './pages/WorkoutPlannerPage'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/exercises/:id" element={<ExerciseDetail />} />
          <Route path="/workout-planner" element={<WorkoutPlannerPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
