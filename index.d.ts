declare class Filattice {
    constructor(nodes: number);
    goldenAngle: number;
    nodes: number;
    piece: number;

    validatePoint(point: [number, number]): void;
    toRadians(angle: number): number;
    latIndex(latitude: number): number;
    nthPoint(index: number): [number, number];
    distanceOf(pointOne: [number, number], pointTwo: [number, number]): number;
    pointsInRange(point: [number, number], distance: number): Array<[number, number, number, number]>;
    nearestPoints(point: [number, number], length?: number): Array<[number, number, number, number]>;
    nearbyPoints(point: [number, number]): Array<[number, number, number, number]>;
    verifyPoint(point: [number, number]): boolean;
}

export = Filattice;