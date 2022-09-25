
/*
* Declaration of FiLattice
*/
declare class FiLattice {
  constructor(nodes?: number);
  validatePoint(point: Array<number>): void;
  toRadians(angle: number): number;
  latIndex(latitude: number): number;
  nthPoint(index: number): Array<number>;
  distanceOf(pointOne: Array<number>, pointTwo: Array<number>): number;
  pointsInRange(point: Array<number>, distance: namber ): Array;
  nearestPoints(point: Array<number>, length: number ): Array;
  nearbyPoints(point: Array<number> ): Array;
  verifyPoint(point: Array<string>): boolean;
}
