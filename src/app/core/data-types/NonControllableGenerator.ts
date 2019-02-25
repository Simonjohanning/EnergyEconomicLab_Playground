export class NonControllableGenerator {
  constructor(
    readonly model: string,
    readonly peakPower: number,
    readonly projectedGeneration: number[]
  ) {}
}
