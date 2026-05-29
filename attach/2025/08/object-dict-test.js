// const n = 10 ** 8

// const primes = [];
// const eularboard = new Uint32Array(n + 1).fill(true);

// for (let i = 2; i <= n; i++) {
//     if (eularboard[i]) {
//         primes.push(i);
//     }
//     for (let j = 0; j < primes.length; j++) {
//         if (i * primes[j] > n) break;
//         eularboard[i * primes[j]] = false;
//         if (i % primes[j] === 0) break;
//     }
// }

// const dict = Object.create(null)
// for (let i = 0; i < primes.length; i++) {
//     dict[primes[i]] = i + 1
// }

// console.log(dict[96887129]) // should print 5592408, actually crashes with RangeError: Invalid string length


const n = 2 ** 24 - 1 // 16777215
// const dict = Object.create(null)
const dict = [];
for (let i = 0; i < n; i++) {
    let key = i * Math.floor(Math.log(i))
    dict[key] = i + 1
    console.log(i)
}
console.log(dict[n]) 