

const FiLattice = require('./index');
const lattice = new FiLattice();

console.log('');
console.log('# 1 #');
console.log('');

lattice.getPoints(
    lattice.toAngle([40.185731, 44.63599833]),
    lattice.toAngle([40.322632, 44.4044473]),
).map(lattice.toLocation).forEach(([lng, lat]) => {
  console.log(`${lng},${lat},#333,circle,"X"`);
});

console.log('');
console.log('# 2 #');
console.log('');

console.log(lattice.toLocation(
    lattice.getClosestPoint(lattice.toAngle([40.3099283, 44.5977348])),
));
console.log(lattice.toLocation(
    lattice.getClosestPoint(lattice.toAngle([40.2983145, 44.6042717])),
));
console.log(lattice.toLocation(
    lattice.getClosestPoint(lattice.toAngle([40.2985838, 44.5883726])),
));

console.log('');
console.log('# 3 #');
console.log('');

console.log(
    lattice.verifyLocation(
        lattice.toAngle([40.28872108459471, 44.59348079999998]),
    ),
);
console.log(
    lattice.verifyLocation(
        lattice.toAngle([40.28872108459473, 44.59348079999998]),
    ),
);
