/**
 * @param {number} nodes count
 * @return {void}
 */
export default class Filattice {
  /**
   * @param {number} nodes count
   * @return {void} */
  constructor(nodes) {
    if (!Number.isInteger(nodes) || nodes <= 0) {
      throw new Error('nodeCount must be a positive integer');
    }

    // 180 * (3 - Math.sqrt(5));
    this.goldenAngle = 137.50776405003785; 
    this.nodes = nodes;
    this.piece = 180 / nodes;
  }

  /**
   * @param {Array} angle
   * @return {void}
   * @throws */
  validatePoint([lat, lng]) {
    return (
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
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
    return Math.round((90 - latitude) / this.piece);
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
    const lat1Rad = this.toRadians(lat1);
    const lat2Rad = this.toRadians(lat2);
    const dLat = lat2Rad - lat1Rad;
    const dLng = this.toRadians(lng2 - lng1);

    const sinDLat = Math.sin(dLat / 2);
    const sinDLng = Math.sin(dLng / 2);

    const a =
      sinDLat * sinDLat +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * sinDLng * sinDLng;

    return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  /**
   * Get Points within given distance
   * @param {Array} point
   * @param {number} distance
   * @return {Array} */
  pointsInRange([lat, lng], distance) {
    /* Validate Point */
    if (!this.validatePoint([lat, lng])) {
      throw new Error('Invalid location');
    }

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
      if (
        !((indexes) => {
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
        })([startIndex + n, startIndex - n])
      ) {
        break;
      }
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
    if (!this.validatePoint([lat, lng])) {
      throw new Error('Invalid location: ' + JSON.stringify([lat, lng]));
    }
  
    /*
     * Set points and start point */
    const startIndex = this.latIndex(lat);
    const points = Array.from({ length });
  
    /*
     * Function to build points */
    const set = (a, c) => {
      const index = a.findIndex((i) => !i || c[2] < i[2]);
      if (index > -1) {
        for (let i = a.length - 1; i > index; i--) {
          a[i] = a[i - 1];
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
      if (
        !((indexes) => {
          if (indexes[1] < 0 && indexes[0] > this.nodes) return false;
          for (const i of indexes) {
            if (i < 0 || i > this.nodes) break;
            const [nLat, nLng] = this.nthPoint(i);
            const last = points[points.length - 1];

            /*
             * Optimization: when nth point lng is
             * bigger than maxLng then skip this loop */
            if (last) {
              if (Math.abs(nLng - lng) > maxLng) continue;
            }
  
            const dist = this.distanceOf([nLat, nLng], [lat, lng]);
            if (!last || dist < last[2]) {
              set(points, [nLat, nLng, dist, i]);
  
              /*
               * When there are at least ${length} points
               * Set maxLng to the longitude difference of the farthest point */
              const lt = points[points.length - 1];
              if (lt) maxLng = Math.abs(lt[1] - lng);
            }
  
            const max = this.distanceOf([nLat, lng], [lat, lng]);
            if (last && last[2] < max) {
              return false;
            }
          }
          return true;
        })([startIndex + n, startIndex - n])
      ) {
        break;
      }
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
    if (!this.validatePoint([lat, lng])) {
      return false;
    }

    /* Verify */
    const [curlat, curlng] = this.nthPoint(this.latIndex(lat));

    return (
      parseFloat(lat) === curlat &&
      parseFloat(lng) === curlng
    );
  }
}