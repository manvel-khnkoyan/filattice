declare module "filattice" {
    export default class Filattice {
      constructor(nodeCount: number);
      validatePoint(point: [number, number]): boolean;
      toRadians(degrees: number): number;
      latIndex(latitude: number): number;
      nthPoint(index: number): [number, number];
      distanceBetweenPoints(
        point1: [number, number],
        point2: [number, number]
      ): number;
      pointsInRange(
        targetPoint: [number, number],
        maxDistance: number
      ): Array<{ point: [number, number]; index: number; distance: number }>;
      nearestPoints(
        targetPoint: [number, number],
        count?: number
      ): Array<{ point: [number, number]; index: number; distance: number }>;
      nearbyPoints(targetPoint: [number, number]): Array<{
        point: [number, number];
        index: number;
        distance: number;
      }>;
      verifyPoint(point: [number, number]): boolean;
    }
  }