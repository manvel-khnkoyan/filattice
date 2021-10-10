/**
 * @param {number} nodes count
 * @return {void}
 */
class Filattice {
  /**
   * @param {number} nodes count
   * @return {void}
   */
  constructor(nodes) {
    this.goldenAngle = 180 * (3 - Math.sqrt(5));
    this.nodes = nodes;
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
  latIndex(latitude) {
    return Math.round((90 - latitude)/this.piece);
  }

  /**
   * @param {number} index
   * @return {Array}
   */
  nthPoint(index) {
    const theta = (index * this.goldenAngle) % 360;
    const lng = theta > 180 ? theta - 360 : theta;
    const lat = 90 - index * this.piece;
    return [lat, lng];
  }

  /**
   * @param {Array} pointOne
   * @param {Array} pointTwo
   * @return {number}
   */
  distanceOf([lat1, lng1], [lat2, lng2]) {
    const dLat = this.toRadians(lat2 - lat1);
    const dlng = this.toRadians(lng2 - lng1);
    const a = Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
      Math.cos(this.toRadians(lat2)) *
      Math.sin(dlng / 2) * Math.sin(dlng / 2);
    return 2 * Math.atan2(
        Math.sqrt(a), Math.sqrt(1 - a),
    );
  }

  /**
   * Actually it get nearest
   * points at first - sorted
   * @param {Array} point
   * @param {number} length
   * @return {Array}
   */
  getPoints([lat, lng], length = 1) {
    /*
     * Set points and start point */
    const index = this.latIndex(lat);
    const points = Array.from({length});

    /*
     * functions that build posts*/
    const set = (a, c) => {
      const index = a.findIndex((i) => !i || c[2] < i[2]);
      if (index > -1) {
        for (let i = a.length - 1; i > index; i--) {
          a[i] = a[i-1];
        }
        a[index] = c;
      }
    };

    /*
    * Set initial point */
    const start = this.nthPoint(index);
    set(points, [...start, this.distanceOf(
        start, [lat, lng])]);

    /*
     * Loop To Find */
    let n = 1;
    while (true) {
      if (!((indexes) => {
        for (const i of indexes) {
          if (i < 0 || i > this.nodes) break;
          const [nLat, nLng] = this.nthPoint(i);
          const dist = this.distanceOf([nLat, nLng], [lat, lng]);

          const last = points[points.length - 1];
          if (!last || dist < last[2]) {
            set(points, [nLat, nLng, dist]);
          }

          const max = this.distanceOf([nLat, lng], [lat, lng]);
          if (last && last[2] < max) {
            return false;
          }
        }
        return true;
      })([index+n, index-n])) {
        break;
      };
      n++;
    }

    return points.map(
        ([a, b]) => [a, b],
    );
  }

  /**
   * @param {Array<string>} point
   * @return {boolean}
   */
  verifyPoint([lat, lng]) {
    const [curlat, curlng] = this.nthPoint(
        this.latIndex(lat),
    );
    return `o${curlat}` === `o${lat}` &&
    `x${curlng}` === `x${lng}`;
  }
}

module.exports = Filattice;
