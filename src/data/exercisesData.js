/**
 * Sample catalog. Expand to 20–25 exercises across:
 * - strength (8+), cardio (6+), flexibility (4+), balance (3+)
 * - beginner (8+), intermediate (7+), advanced (5+)
 * - chest, back, shoulders, arms, core, legs
 */
export const exercisesData = [
  {
    id: 1,
    name: 'Push-ups',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    difficulty: 'beginner',
    duration: 10,
    sets: 3,
    reps: 15,
    image: '/assets/images/pushups.jpg',
    videoUrl: '/assets/videos/pushups-tutorial.mp4',
    instructions: [
      'Start in a plank position with hands shoulder-width apart',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep core engaged throughout',
    ],
    equipment: 'none',
    caloriesBurn: 50,
  },
]
