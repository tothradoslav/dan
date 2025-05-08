import {danAdd, dan} from './dan.js';

console.time('danAdd()')
for (let i = 0; i < 1_000_000; i++) {
  danAdd(20231001, 7, 'd');
}
console.timeEnd('danAdd()')

console.time('dan()')
for (let i = 0; i < 1_000_000; i++) {
  dan(20231001, 'YYYY-MM-DD');
}
console.timeEnd('dan()')

