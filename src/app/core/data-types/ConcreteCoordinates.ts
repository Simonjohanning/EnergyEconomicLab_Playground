import {Coordinates} from './Coordinates';

export class ConcreteCoordinates implements Coordinates{
  constructor(
    readonly x: number,
    readonly y: number
  ) {}
}
