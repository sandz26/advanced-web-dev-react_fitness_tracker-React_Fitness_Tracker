# Gritline Planning Document

Gritline is a React fitness tracker and weekly planner built with Vite, React 19, and React Router 8.

## Component Hierarchy

```
App
├── Navbar
├── Routes
│   ├── Home (Header, Card, AchievementCard, AudioPlayer)
│   ├── ExercisesPage (SearchBar, ExerciseFilter, ExerciseList > ExerciseCard > Badge, Modal)
│   ├── ExerciseDetail (Badge, VideoPlayer, Button, Modal)
│   ├── WorkoutPlannerPage (WorkoutPlanner > DayCard > Button)
│   ├── HistoryPage (WorkoutLog > LogEntry)
│   ├── HistoryEntryPage (Card, Button)
│   ├── ProgressPage (AchievementCard, ProgressChart)
│   └── NotFound (Button)
└── Footer
```

## Data Flow & State Strategy

Shared state is lifted to `App.jsx` and persisted via `useLocalStorage` (`gritline-workout-plan`, `gritline-workout-history`).

```
                 App (workoutPlan, workoutHistory)
                 │  props down / callbacks up
  ├─ ExercisesPage / Detail ──onAddToPlan──► App
  ├─ WorkoutPlanner ──onRemove / onClear──► App
  ├─ HistoryPage ──onLogWorkout──► App
  └─ Home & Progress read lifted state
```

- **Props Down**: State and handlers pass to children.
- **Callbacks Up**: Child actions (`onAddToPlan`, `onRemoveExercise`, `onClearDay`, `onSubmit`) update root state.
- **Local State**: Search query, filter selections, modal toggles, and form inputs stay inside local components.

## Components & Purpose

- **Navbar**: Brand logo, active links, accessible mobile drawer.
- **Footer**: Brand statement and app summary.
- **Header**: Standardized page title and subtitle.
- **ExerciseCard / ExerciseList**: Catalog grid with `lucide-react` icons, badges, and actions.
- **ExerciseFilter / SearchBar**: Multi-criteria filtering (category, muscle, difficulty, sort) and query search.
- **ExerciseDetail**: Full instructions, stats, and HTML5 video form demo.
- **WorkoutPlanner / DayCard**: 7-day Monday–Sunday planner with exercise removal and day clearing.
- **WorkoutLog / LogEntry**: Form logging sets, reps, weight, and history rows linking to `/history/:entryId`.
- **ProgressChart**: Visual bars for completed sessions, planned moves, calories, and streaks.
- **AchievementCard**: Milestone tile with mint teal badge and streak pill.
- **VideoPlayer / AudioPlayer**: HTML5 media with custom play/pause control.
- **Button / Card / Modal / Badge**: Reusable Urban Tech UI elements with 8–12px radius.

## Props Flow

- **ExerciseCard**: `exercise` (object), `onSelect`, `onAdd`, `isInPlan` (boolean).
- **DayCard**: `day` (string), `exercises` (array), `onRemoveExercise`, `onClearDay`.
- **WorkoutLog**: `entries` (array), `onSubmit` (function).
- **Button / Card / Modal**: `children`, `variant`, `title`, `selected`, `onClick`.

## Testing Strategy

- **UI Components (Button, Card, Badge, Modal, SearchBar)**: Unit tests for render, variants, accessibility, and click/submit events.
- **Feature Components (ExerciseCard, DayCard, WorkoutLog, ProgressChart)**: Props validation, conditional states (empty/selected), and form validation.
- **Media (VideoPlayer, AudioPlayer)**: Play/pause event synchronization and fallback handling.
- **Pages & Routing (Home, Exercises, History, NotFound)**: Route mounting, async catalog loading, and error states.
- **Integration**: `Navigation.test.jsx` (route transitions) and `WorkoutFlow.test.jsx` (adding to planner and logging).
- **Target**: 40+ tests and >70% coverage using Vitest and React Testing Library.
