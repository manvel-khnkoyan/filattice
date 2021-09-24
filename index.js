
const Big = require('big.js');

/**
 * @param {number} nodes count
 * @return {void}
 */
class FiLattice {
  /**
   * @param {number} nodes count
   * @return {void}
   */
  constructor(nodes = 100000000) {
    this.goldenAngle = 180 * (3 - Math.sqrt(5));
    this.piece = 180 / nodes;
  }

  /**
   * @param {number} angle
   * @return {number}
   */
  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  /**
   * @param {Array} any
   * @return {Array}
   */
  toAngle([lng, lat]) {
    const x = new Big(lat);
    return [
      +lng, x.plus(90).toNumber(),
    ];
  }

  /**
   * @param {Array} any
   * @return {Array}
   */
  toLocation([alfa, beta]) {
    const x = new Big(beta);
    return [
      alfa, x.minus(90).toNumber(),
    ];
  }

  /**
   * @param {number} index
   * @return {Array}
   */
  getNthAngle(index) {
    const theta = (index * this.goldenAngle) % 360;
    const alfa = theta > 180 ? theta - 360 : theta;
    const beta = index * this.piece;
    return [alfa, beta];
  }

  /**
   * @param {Array<number>} PointOne
   * @param {Array<number>} PointTwo
   * @return {Array<number>}
   */
  getPoints([alfa1, beta1], [alfa2, beta2]) {
    const one = Math.round(beta1/this.piece);
    const two = Math.round(beta2/this.piece);
    const nth = [one, two].sort();

    const alfas = [alfa1, alfa2].sort();
    const betas = [beta1, beta2].sort();

    const points = [];
    let theta = 0;
    for (let i = nth[0]; i <= nth[1]; i++) {
      theta += this.goldenAngle;
      theta = theta % 360;

      const point = this.getNthAngle(i);
      if (
        point[0] > alfas[0] && point[0] < alfas[1] &&
              point[1] > betas[0] && point[1] < betas[1]
      ) {
        points.push(point);
      }
    }

    return points;
  }

  /**
   * @param {Array} point
   * @return {Array}
   */
  getClosestPoint([alfa, beta]) {
    /**/
    const startIndex = Math.round(beta/this.piece);

    /*
      * In each point calculating and setting minimum angel of
      * points
      */
    let nearestDistance = 1;

    /*
      * In each point calculating and setting minimum angel of
      * points
      */
    let nearestIndex = null;

    let n = -1;
    while (true) {
      n++;
      for (const index of [startIndex+n, startIndex-n]) {
        const [indexAlfa, indexBeta] = this.getNthAngle(index, this.piece);

        const y = Math.abs(Math.sin(this.toRadians(indexBeta - beta)));
        if (y > nearestDistance) {
          return this.getNthAngle(nearestIndex, this.piece);
        }

        if (Math.abs(indexAlfa - alfa) > 90) {
          continue;
        }

        const x = Math.abs(Math.sin(this.toRadians(indexAlfa - alfa)));
        if (x > nearestDistance ) {
          continue;
        }

        const distance = Math.sqrt(x*x + y*y);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      }
    }
  }

  /**
   * @param {Array} point
   * @return {Array}
   */
  verifyLocation([alfa, beta]) {
    const index = beta / this.piece;
    const [curAlfa, curBeta] = this.getNthAngle(
        Math.round(index), this.piece,
    );
    return `j${curAlfa}` === `j${alfa}` &&
      `j${curBeta}` === `j${beta}`;
  }
}

module.exports = FiLattice;
