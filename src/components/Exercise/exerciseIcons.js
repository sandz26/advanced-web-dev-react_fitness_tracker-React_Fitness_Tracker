// exerciseIcons.js
// Maps each exercise name to a lucide-react icon component + a category color.
// No network calls, no API keys — icons ship with the lucide-react package.
//
// npm install lucide-react

import {
  Dumbbell,
  Flame,
  Footprints,
  Bike,
  Repeat,
  RotateCcw,
  TrendingUp,
  Timer,
  Move,
  Cat,
  Flower2,
  Waves,
  Anchor,
  ArrowUpDown,
  ChevronsUp,
  Scale,
  Wind,
  PersonStanding,
  Activity,
  Mountain,
  HandMetal,
  StretchVertical,
} from 'lucide-react'

// Category -> color (used for icon tint + badge accents)
export const CATEGORY_COLORS = {
  Strength: '#E67E22', // Copper Orange
  Cardio: '#ea580c', // Earthy rust orange
  Flexibility: '#1ABC9C', // Mint Teal
  Balance: '#7c3aed', // Purple accent
}

// Exercise name -> { icon, category }
export const EXERCISE_ICON_MAP = {
  'Bench Press': { icon: Dumbbell, category: 'Strength' },
  'Bosu Squats': { icon: Scale, category: 'Balance' },
  Burpees: { icon: Flame, category: 'Cardio' },
  'Cat-Cow': { icon: Cat, category: 'Flexibility' },
  "Child's Pose": { icon: Flower2, category: 'Flexibility' },
  'Cycling Sprints': { icon: Bike, category: 'Cardio' },
  Deadlift: { icon: Anchor, category: 'Strength' },
  'Downward Dog': { icon: Mountain, category: 'Flexibility' },
  'Dumbbell Rows': { icon: RotateCcw, category: 'Strength' },
  'Hamstring Stretch': { icon: StretchVertical, category: 'Flexibility' },
  'High Knees': { icon: Footprints, category: 'Cardio' },
  'Jump Rope': { icon: Repeat, category: 'Cardio' },
  'Jumping Jacks': { icon: PersonStanding, category: 'Cardio' },
  Lunges: { icon: ArrowUpDown, category: 'Strength' },
  'Mountain Climbers': { icon: TrendingUp, category: 'Cardio' },
  'Overhead Press': { icon: ChevronsUp, category: 'Strength' },
  Plank: { icon: Move, category: 'Strength' },
  'Pull-ups': { icon: HandMetal, category: 'Strength' },
  'Push-ups': { icon: Activity, category: 'Strength' },
  'Running Intervals': { icon: Timer, category: 'Cardio' },
  'Shoulder Stretch': { icon: Wind, category: 'Flexibility' },
  'Single-leg Stand': { icon: PersonStanding, category: 'Balance' },
  Squats: { icon: Dumbbell, category: 'Strength' },
  'Tree Pose': { icon: Waves, category: 'Balance' },
}

// Fallback icon if an exercise name isn't in the map (e.g. new items added later)
export const DEFAULT_ICON = Dumbbell
