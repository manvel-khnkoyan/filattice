// filattice.test.js
import { describe, it, expect } from 'vitest';
import Filattice from './index.mjs'; // Adjust the import path as necessary

describe('Filattice Class', () => {
  describe('Verifying Points', () => {
    describe('Lattice with 1 Billion Nodes', () => {
      const lattice1B = new Filattice(1000000000);
      const testCases = [
        { point: [40.18874003, 44.52654266357422], expected: false },
        { point: ['40.18874003', '44.52654266357422'], expected: false },
        { point: ['40.18874004', '44.52654266357422'], expected: true },
        { point: [40.18874004, 44.52654266357422], expected: true },
        { point: [-53.294494859999986, -168.45420837402344], expected: true },
        { point: [-72.1239401322, 169.455078125], expected: false },
      ];

      testCases.forEach(({ point, expected }) => {
        it(`should return ${expected} for point ${JSON.stringify(point)}`, () => {
          expect(lattice1B.verifyPoint(point)).toBe(expected);
        });
      });
    });

    describe('Lattice with 100 Billion Nodes', () => {
      const lattice100B = new Filattice(100000000000);
      const testCases = [
        { point: [0, 0], expected: false },
        { point: ['-0.00024357060000568254', 0], expected: true },
        { point: [63.2969772264, -169.457763671875], expected: true },
        { point: [63.2969772254, -169.457763671875], expected: false },
        { point: [-82.2970944864, -169.462890625], expected: true },
        { point: [-72.1239401322, 169.455078125], expected: true },
        { point: [-72.12429368459999, 169.455078129], expected: false },
      ];

      testCases.forEach(({ point, expected }) => {
        it(`should return ${expected} for point ${JSON.stringify(point)}`, () => {
          expect(lattice100B.verifyPoint(point)).toBe(expected);
        });
      });
    });

    describe('Invalid Points', () => {
      const lattice100B = new Filattice(100000000000);
      const testCases = [
        [0, 'a'],
        [63.2969772264, -189.457763671875],
        [93.2969772254, -169.457763671875],
        ['-92.2970944864', -169.462890625],
        [-72.1239401322, 199.455078125],
        [true],
      ];

      testCases.forEach((point) => {
        it(`should return false for invalid point ${JSON.stringify(point)}`, () => {
          expect(lattice100B.verifyPoint(point)).toBe(false);
        });
      });
    });
  });

  describe('Nearest Points', () => {
    const lattice100B = new Filattice(100000000000);
    const testCases = [
      {
        spot: [40.188743, 44.5265],
        length: 4,
        expectedPoints: [
          [40.1887146834, 44.5263671875],
          [40.188361131, 44.52587890625],
          [40.1881426236, 44.52685546875],
          [40.1892867432, 44.52587890625],
        ],
      },
      {
        spot: [-79.188743, -159.5265],
        length: 3,
        expectedPoints: [
          [-79.18875109620001, -159.52734375],
          [-79.1886160512, -159.525390625],
          [-79.1885325888, -159.52734375],
        ],
      },
    ];

    testCases.forEach(({ spot, length, expectedPoints }) => {
      describe(`Nearest points to ${JSON.stringify(spot)} with length ${length}`, () => {
        const list = lattice100B.nearestPoints(spot, length);

        it(`should return ${length} points`, () => {
          expect(list.length).toBe(length);
        });

        list.forEach(([lat, lng], index) => {
          it(`Point ${index} should be equal to ${expectedPoints[index]}`, () => {
            expect([lat, lng]).toEqual(expectedPoints[index]);
          });
        });
      });
    });
  });

  describe('Nearby Points for 100K Nodes', () => {
    const lattice100K = new Filattice(100000);
    const testCases = [
      {
        spot: [19.188743, 169.5265],
        expectedPoints: [
          [19.400400000000005, 169.52157058473676],
          [18.7218, 169.94861744903028],
          [18.98100000000001, 168.83059424348176],
        ],
      },
      {
        spot: [-19.188743, -89.5265],
        expectedPoints: [
          [-18.97919999999999, -89.93335450813174],
          [-19.657799999999995, -89.50630764383823],
          [-19.2384, -88.81533130258322],
          [-18.559799999999996, -89.24237816687673],
        ],
      },
      {
        spot: [88.24234, -123.5265],
        expectedPoints: [
          [88.2486, -124.94557931317831],
          [88.1496, -122.01855656108819],
          [88.3098, -120.20955701445928],
        ],
      },
    ];

    testCases.forEach(({ spot, expectedPoints }) => {
      describe(`Nearby points to ${JSON.stringify(spot)}`, () => {
        const list = lattice100K.nearbyPoints(spot);

        it(`should return ${expectedPoints.length} points`, () => {
          expect(list.length).toBe(expectedPoints.length);
        });

        list.forEach(([lat, lng], index) => {
          it(`Point ${index} should be equal to ${expectedPoints[index]}`, () => {
            expect([lat, lng]).toEqual(expectedPoints[index]);
          });
        });
      });
    });
  });

  describe('Nearby Points for 10 Billion Nodes', () => {
    const lattice10B = new Filattice(10000000000);
    const testCases = [
      {
        spot: [-86.3131292, 179.5970966],
        expectedPoints: [
          [-86.31278663399999, 179.5966796875],
          [-86.31330245999999, 179.591064453125],
          [-86.31362125799998, 179.60009765625],
          [-86.31310543199999, 179.605712890625],
        ],
      },
      {
        spot: [-79.3131292, -179.5970966],
        expectedPoints: [
          [-79.31371073399998, -179.59814453125],
          [-79.312360284, -179.595947265625],
          [-79.31319490799999, -179.592529296875],
          [-79.31287610999999, -179.6015625],
        ],
      },
    ];

    testCases.forEach(({ spot, expectedPoints }) => {
      describe(`Nearby points to ${JSON.stringify(spot)}`, () => {
        const list = lattice10B.nearbyPoints(spot);

        it(`should return ${expectedPoints.length} points`, () => {
          expect(list.length).toBe(expectedPoints.length);
        });

        list.forEach(([lat, lng], index) => {
          it(`Point ${index} should be equal to ${expectedPoints[index]}`, () => {
            expect([lat, lng]).toEqual(expectedPoints[index]);
          });
        });
      });
    });

  });

  describe('Distance Calculation', () => {
    const lattice1B = new Filattice(1000000000);
    const testCases = [
      [
        [44.968046, -40.420307], 
        [44.96648904, -40.41815185546875],
        0.00003803497276467072
      ],
      [
        [-84.24500046, 169.420307], 
        [-78.96648904, 163.41815185546875],
        0.09326398459106579
      ]
    ];

    testCases.forEach(([point1, point2, expectedDistance ]) => {
      it(`should return ${expectedDistance} for distance between ${JSON.stringify(point1)} and ${JSON.stringify(point2)}`, () => {
        expect(lattice1B.distanceOf(point1, point2)).toBe(expectedDistance);
      });
    });
  });
});