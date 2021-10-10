

const Filattice = require('./index');
const lattice = new Filattice(1000);

console.log('Get Point Of Yerevan');
lattice.getPoints(
    [40.30488967895508, 44.599140000000006], 5,
).forEach(([lng, lat]) => {
  console.log(`${lng},${lat},#333,circle,"X"`);
});

console.log('Get Point Of Antarctida');
lattice.getPoints(
    [-69.67029959999999, -69.33574867248535], 5,
).forEach(([lng, lat]) => {
  console.log(`${lng},${lat},#333,circle,"X"`);
});

console.log('Get Closest');
lattice.getPoints(
    [40.3012902, 44.597541], 1,
).forEach(([lng, lat]) => {
  console.log(`${lng},${lat},#333,circle,"X"`);
});

console.log('Verifying Points');

console.log(lattice.verifyPoint(
    ['40.30488967895508', '44.599140000000006'],
));
console.log(lattice.verifyPoint(
    ['40.3056684', '44.598411083221436'],
));
console.log(lattice.verifyPoint(
    [40.3056684, 44.598411083221436],
));
