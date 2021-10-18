
const Filattice = require('./index');
const lattice = new Filattice(1000000000);

/*
* */
const paint = ([lng, lat], i) => {
  console.log(`${lng},${lat},#333,circle,"${i+1}"`);
};

/* Example 1
* */
console.log('Get Nearby Point');
lattice.nearbyPoints(
    [40.3131292, 44.5970966],
).forEach(paint);


/* Example 2
* */
console.log('Get Nearset 16 Point');
lattice.nearestPoints(
    [-53.2968852, -68.4579599], 16,
).forEach(paint);


/* Example 3
* */
console.log('Get Points In Range');
lattice.pointsInRange(
    [40.1756897, 44.51510469], 0.0005,
).forEach(paint);


/* Example 4
* */
console.log('Verifying Points');
console.log(lattice.verifyPoint(
    [40.18874003, 44.52654266357422],
));
console.log(lattice.verifyPoint(
    ['40.18874003', '44.52654266357422'],
));
console.log(lattice.verifyPoint(
    ['40.18874004', '44.52654266357422'],
));
console.log(lattice.verifyPoint(
    [40.18874004, 44.52654266357422],
));
