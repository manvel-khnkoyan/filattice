
/*
* Declaration of FiLattice
*/
declare class FiLattice {
  constructor(nodes?: number);
  toRadians(opts: number): number;
  getLatIndex(opts: number): number;
  getNthPoint(opts: number): number;
  getPoints(pointOne: Array<number>, pointTwo: Array<number>, ): Array<number>;
  getClosestPoint(pointOne: Array<number>, pointTwo: Array<number>, ): Array<number>;
  verifyPoint(pointOne: Array<string>, pointTwo: Array<string>, ): boolean;
}
