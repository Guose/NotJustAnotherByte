export interface Step {
  _id: string
  order: number
  item?: string
  instruction: string
  durationSeconds: number
  subSteps: Step[]
}