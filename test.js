
import assert from 'assert';
import Filattice from './index.mjs';

describe('Verifing Points', function() {
  const Lattice1B = new Filattice(1000000000);
  [
    [[40.18874003, 44.52654266357422], false],
    [['40.18874003', '44.52654266357422'], false],
    [['40.18874004', '44.52654266357422'], true],
    [[40.18874004, 44.52654266357422], true],
    [[-53.294494859999986, -168.45420837402344], true],
    [[-72.1239401322, 169.455078125], false],
  ].forEach(([array, result]) => {
    it(`1B Lattice: ${JSON.stringify(array)} should be ${result}`, function() {
      assert.equal(Lattice1B.verifyPoint(
          array,
      ), result);
    });
  });

  const Lattice100B = new Filattice(100000000000);
  [
    [[0, 0], false],
    [['-0.00024357060000568254', 0], true],
    [['-0.00024357060000568254', 0], true],
    [[63.2969772264, -169.457763671875], true],
    [[63.2969772254, -169.457763671875], false],
    [[-82.2970944864, -169.462890625], true],
    [[-72.1239401322, 169.455078125], true],
    [[-72.12429368459999, 169.455078129], false],
  ].forEach(([array, result]) => {
    it(`100B Lattice: ${JSON.stringify(array)} should be ${result}`,
        function() {
          assert.equal(Lattice100B.verifyPoint(
              array,
          ), result);
        });
  });

  [
    [[0, 'a']],
    [[63.2969772264, -189.457763671875]],
    [[93.2969772254, -169.457763671875]],
    [['-92.2970944864', -169.462890625]],
    [[-72.1239401322, 199.455078125]],
    [[true]],
  ].forEach(([array]) => {
    it(`100B Lattice: ${JSON.stringify(array)} should throw`,
        function() {
          assert.equal(Lattice100B.verifyPoint(array), []);
        },
    );
  });
});


describe('Nearest Points for 100B', function() {
  const Lattice100B = new Filattice(100000000000);

  [
    [
      [40.188743, 44.5265], 4, [
        [40.1887146834, 44.5263671875],
        [40.188361131, 44.52587890625],
        [40.1881426236, 44.52685546875],
        [40.1892867432, 44.52587890625],
      ],
    ],
    [
      [-79.188743, -159.5265], 3, [
        [-79.18875109620001, -159.52734375],
        [-79.1886160512, -159.525390625],
        [-79.1885325888, -159.52734375],
      ],
    ],
  ].forEach(([spot, length, points]) => {
    const list = Lattice100B.nearestPoints(spot, length);

    it(
        `Lattice: ${JSON.stringify(list)} 
        should be in length ${length}`,
        () => assert.equal(list.length, length),
    );

    list.forEach( ([lat, lng], index) => {
      it(`${[lat, lng]} should be equal to ${points[index]}`,
          () => assert.equal(String([lat, lng]), String(points[index])));
    });
  });
});


describe('Nearby Points For 100K', function() {
  const Lattice100K = new Filattice(100000);

  [
    [
      [19.188743, 169.5265], [
        [19.400400000000005, 169.52157058473676],
        [18.7218, 169.94861744903028],
        [18.98100000000001, 168.83059424348176],
      ],
    ],
    [
      [-19.188743, -89.5265], [
        [-18.97919999999999, -89.93335450813174],
        [-19.657799999999995, -89.50630764383823],
        [-19.2384, -88.81533130258322],
        [-18.559799999999996, -89.24237816687673],
      ],
    ],
    [
      [88.24234, -123.5265], [
        [88.2486, -124.945579313178314],
        [88.1496, -122.01855656108819],
        [88.3098, -120.20955701445928],
      ],
    ],
  ].forEach(([spot, points]) => {
    const list = Lattice100K.nearbyPoints(spot);

    it(
        `Lattice: ${JSON.stringify(list)} 
        should be in length ${points.length}`,
        () => assert.equal(list.length, points.length),
    );

    list.forEach( ([lat, lng], index) => {
      it(`${[lat, lng]} should be equal to ${points[index]}`,
          () => assert.equal(String([lat, lng]), String(points[index])));
    });
  });
});

describe('Nearby Points For 10B', function() {
  const Lattice10B = new Filattice(10000000000);

  [
    [
      [-86.3131292, 179.5970966], [
        [-86.31278663399999, 179.5966796875],
        [-86.31330245999999, 179.591064453125],
        [-86.31362125799998, 179.60009765625],
        [-86.31310543199999, 179.605712890625],
      ],
    ],
    [
      [-79.3131292, -179.5970966], [
        [-79.31371073399998, -179.59814453125],
        [-79.312360284, -179.595947265625],
        [-79.31319490799999, -179.592529296875],
        [-79.31287610999999, -179.6015625],
      ],
    ],
  ].forEach(([spot, points]) => {
    const list = Lattice10B.nearbyPoints(spot);
    it(
        `Lattice: ${JSON.stringify(list)} 
          should be in length ${points.length}`,
        () => assert.equal(list.length, points.length),
    );

    list.forEach( ([lat, lng], index) => {
      it(`${[lat, lng]} should be equal to ${points[index]}`,
          () => assert.equal(String([lat, lng]), String(points[index])));
    });
  });
});

