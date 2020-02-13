import {Coordinates} from './Coordinates';

/**
 * An implementation class of abstract coordinates in a 2-dimensional plane.
 * Coordinates are represented as a two-dimensional tupel with a relative referential system
 *
 * @param x The longitudinal coordinate component
 * @param y The latitudinal coordinate component
 *
 */
export class ConcreteCoordinates implements Coordinates {
  constructor(
    readonly x: number,
    readonly y: number
  ) {}
}
