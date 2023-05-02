/**
* @param {number} nodes count
* @return {void}
*/
export default class Filattice {
  /**
  * @param {number} nodes count
  * @return {void} */
  constructor(nodes) {
    this.goldenAngle = 180 * (3 - Math.sqrt(5));
    this.nodes = nodes;
    this.piece = 180 / nodes;
  }

  /**
  * @param {Array} angle
  * @return {void}
  * @throws */
  validatePoint([lat, lng]) {
    if (
      isNaN(lat) || isNaN(lng)||
      lat > 90 || lat < -90 ||
      lng > 180 || lng < -180
    ) {
      throw new Error('Invalid geolocation');
    }
  }

  /**
  * @param {number} angle
  * @return {number} */
  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  /**
  * @param {number} latitude
  * @return {number} */
  latIndex(latitude) {
    return Math.round((90 - latitude)/this.piece);
  }

  /**
  * @param {number} index
  * @return {Array} */
  nthPoint(index) {
    const theta = (index * this.goldenAngle) % 360;
    const lng = theta > 180 ? theta - 360 : theta;
    const lat = 90 - index * this.piece;
    return [lat, lng];
  }

  /**
  * @param {Array} pointOne
  * @param {Array} pointTwo
  * @return {number} */
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
  * Get Points within given distance
  * @param {Array} point
  * @param {number} distance
  * @return {Array} */
  pointsInRange([lat, lng], distance) {
    /* Validate Point */
    this.validatePoint([lat, lng]);

    /* */
    const points = [];
    /*
    * Set points and start point */
    const startIndex = this.latIndex(lat);
    const startPoint = this.nthPoint(startIndex);
    if (this.distanceOf(startPoint, [lat, lng]) < distance) {
      points.push(startPoint);
    }

    /*
    * Loop To Find */
    let n = 1;
    while (true) {
      if (!((indexes) => {
        for (const i of indexes) {
          if (i < 0 || i > this.nodes) break;
          const [iLat, iLng] = this.nthPoint(i);
          const dist = this.distanceOf([iLat, iLng], [lat, lng]);
          const max = this.distanceOf([iLat, lng], [lat, lng]);
          if (dist < distance) {
            points.push([iLat, iLng, dist, i]);
          }
          if (max > distance) {
            return false;
          }
        }
        return true;
      })([startIndex+n, startIndex-n])) {
        break;
      };
      n++;
    }

    return points;
  }

  /**
  * Get Closest Points, sorted by distance
  * @param {Array} point
  * @param {number} length
  * @return {Array} */
  nearestPoints([lat, lng], length = 1) {
    /* Validate Point */
    this.validatePoint([lat, lng]);

    /*
     * Set points and start point */
    const startIndex = this.latIndex(lat);
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
    const start = this.nthPoint(startIndex);
    set(points, [...start, this.distanceOf(start, [lat, lng]), startIndex]);

    /*
    * Loop To Find */
    let n = 1;
    let maxLng = 0;


    while (true) {
      if (!((indexes) => {
        if (indexes[1] < 0 && indexes[0] > this.nodes) return false;
        for (const i of indexes) {
          if (i < 0 || i > this.nodes) break;
          const [nLat, nLng] = this.nthPoint(i);
          const last = points[points.length - 1];

          /*
           * Optimization: when nth point lng is
           * bigger then maxLng then sckip this loop */
          if (last) {
            if (
              Math.abs(nLng - lng) > maxLng
            ) continue;
          }

          const dist = this.distanceOf([nLat, nLng], [lat, lng]);
          if (!last || dist < last[2]) {
            set(points, [nLat, nLng, dist, i]);

            /*
             * When There is at least ${length} points
             * Set maxLng farthest point lng */
            const lt = points[points.length - 1];
            if (lt) maxLng = Math.abs(lt[1] - lng);
          }

          const max = this.distanceOf([nLat, lng], [lat, lng]);
          if (last && last[2] < max) {
            return false;
          }
        }
        return true;
      })([startIndex+n, startIndex-n])) {
        break;
      };
      n++;
    }

    return points;
  }

  /**
   * Get nearest most optimal points
   * (from 3 to 5)
   * @param {Array} point
   * @return {Array} */
  nearbyPoints(point) {
    /* */
    const points = this.nearestPoints(point, 9);
    const max = points.reduce((a, b) => a + b[2], 0) / 9;
    return points.filter((p) => p[2] < max);
  }

  /**
  * @param {Array<string>} point
  * @return {boolean} */
  verifyPoint([lat, lng]) {
    /* Validate Point */
    this.validatePoint([lat, lng]);

    /* Verify */
    if (lat > 90 || lat < -90) return false;
    if (lng > 180 || lng < -180) return false;
    const [curlat, curlng] = this.nthPoint(
        this.latIndex(lat),
    );
    return `o${curlat}` === `o${lat}` &&
    `x${curlng}` === `x${lng}`;
  }
}
