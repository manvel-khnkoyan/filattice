import Filattice from './index.mjs';

const F10B = new Filattice(10000000000);

const log = (obj) => (fn, ...arg) => {  
    const t = Date.now();
    const res = obj[fn](...arg);
    console.log(obj.constructor.name + `: ${fn} ` , res, ` - ${Date.now() - t}ms`);
}

log(F10B)('distanceOf', [44.968046, -40.420307], [44.96648904, -40.41815185546875]);





