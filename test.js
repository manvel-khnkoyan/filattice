

const FiLattice = require('./index');
const lattice = new FiLattice();

console.log('');
console.log('# 1 #');
console.log('');

lattice.getPoints(
    [40.185731, 44.63599833],
    [40.322632, 44.4044473],
).forEach(([lng, lat]) => {
  console.log(`${lng},${lat},#333,circle,"X"`);
});

console.log('');
console.log('# 2 #');
console.log('');

console.log(lattice.getClosestPoint(
    [40.3099283, 44.5977348],
));
console.log(lattice.getClosestPoint(
    [40.2983145, 44.6042717],
));
console.log(lattice.getClosestPoint(
    [40.2985838, 44.5883726],
));

console.log('');
console.log('# 3 #');
console.log('');

console.log(lattice.verifyPoint(
    ['40.30488967895508', '44.599140000000006'],
));
console.log(lattice.verifyPoint(
    ['40.30488967895508', '44.599140000000005'],
));
console.log(lattice.verifyPoint(
    ['40.290181159973145', '44.5794372'],
));
