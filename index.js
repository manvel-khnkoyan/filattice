
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
   * @param {number} latitude
   * @return {number}
   */
  getLatIndex(latitude) {
    return Math.round((90 - latitude)/this.piece);
  }

  /**
   * @param {number} index
   * @return {Array}
   */
  getNthPoint(index) {
    const theta = (index * this.goldenAngle) % 360;
    const lng = theta > 180 ? theta - 360 : theta;
    const lat = 90 - index * this.piece;
    return [lng, lat];
  }

  /**
   * @param {Array<number>} PointOne
   * @param {Array<number>} PointTwo
   * @return {Array<number>}
   */
  getPoints([lng1, lat1], [lng2, lat2]) {
    const one = this.getLatIndex(lat1);
    const two = this.getLatIndex(lat2);

    const [nthMin, nthMax] = [one, two].sort();
    const [lngMin, lngMax] = [lng1, lng2].sort();

    const points = [];
    let theta = 0;
    for (let i = nthMin; i <= nthMax; i++) {
      theta += this.goldenAngle;
      theta = theta % 360;
      const [nthLng, nthLat] = this.getNthPoint(i);

      if ( nthLng > lngMin && nthLng < lngMax ) {
        points.push([nthLng, nthLat]);
      }
    }
    return points;
  }

  /**
   * @param {Array} point
   * @return {Array}
   */
  getClosestPoint([lng, lat]) {
    /**/
    const startIndex = this.getLatIndex(lat);

    /**/
    let nearestDistance = 1;
    let nearestIndex = null;

    let n = -1;
    while (true) {
      n++;
      for (const index of [startIndex+n, startIndex-n]) {
        const [indexlng, indexlat] = this.getNthPoint(index, this.piece);

        const y = Math.abs(Math.sin(this.toRadians(indexlat - lat)));
        if (y > nearestDistance) {
          return this.getNthPoint(nearestIndex, this.piece);
        }

        if (Math.abs(indexlng - lng) > 90) {
          continue;
        }

        const x = Math.abs(Math.sin(this.toRadians(indexlng - lng)));
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
  verifyPoint([lng, lat]) {
    const [curlng, curlat] = this.getNthPoint(
        this.getLatIndex(lat),
    );

    console.log([lng, lat]);
    console.log([curlng, curlat]);

    return `x${curlng}` === `x${lng}` &&
      `o${curlat}` === `o${lat}`;
  }
}

module.exports = FiLattice;
