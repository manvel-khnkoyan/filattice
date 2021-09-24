
/*
* Declaration of FiLattice
*/
declare class FiLattice {
  constructor(nodes?: number);
  toRadians(opts: number): number;
  toAngle(abn: Array<number>): Array<number>;
  toLocation(abn: Array<number>): Array<number>;
  getNthAngle(opts: number): number;
  getPoints(pointOne: Array<number>, pointTwo: Array<number>, ): Array<number>;
  getClosestPoint(pointOne: Array<number>, pointTwo: Array<number>, ): Array<number>;
  verifyLocation(pointOne: Array<number>, pointTwo: Array<number>, ): boolean;
}
