// https://mobisoftinfotech.com/tools/plot-multiple-points-on-map/

const Filattice = require('./index');
const Lattice = new Filattice(10000000000);

/*
* */
const paint = (color = '#333') => ([lng, lat], i) => {
  console.log(`${lng},${lat},${color},circle,"${isNaN(i)?'X':i+1}"`);
};

/*
* */
console.log('Get nearbyPoints');
const point = [-86.3131292, 179.5970966];
paint('#F00')(point);
Lattice.nearbyPoints(point).forEach(paint());


/*
* */
// const point = [-86.3131292, 179.5970966]];
// paint('#F00')(point);
// Lattice.nearestPoints(point, 16).forEach(paint());
