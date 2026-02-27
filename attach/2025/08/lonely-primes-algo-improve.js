const startTime = new Date();

console.log('prime table and spf table generation...');
const n = 10 ** 8;
const spf = new Uint32Array(n + 1).fill(0);
const primes = [];
const primeIndex = new Map()
const product = new Uint32Array(n + 1);

// 构建SPF和素数序号
for (let i = 2; i <= n; i++) {
    if (spf[i] === 0) {
        spf[i] = i;
        primes.push(i);
        const ll = primes.length
        primeIndex.set(i, ll); // 记录素数序号
    }

    for (let j = 0, len = primes.length; j < len; j++) {
        const p = primes[j];
        const ip = i * p;
        if (p > spf[i] || ip > n) break;
        spf[ip] = p;
        if (i % p === 0) break;
    }
}

console.log('calc product...');
// 直接计算因子序数乘积
product[1] = 1;
for (let i = 2; i <= n; i++) {
    const p = spf[i]; // 最小质因数
    const prev = i / p;
    product[i] = product[prev] * primeIndex.get(p);
}


console.log('lonely primes calc...');
const lonelyPrimes = [];
for (let idx = 0; idx < primes.length; idx++) {
    const p = primes[idx];
    const target = idx + 1;
    const half = Math.floor(p / 2);
    let lonely = true;
    for (let m = 2; m < half; m++) {
        if (product[m] + product[p - m] === target) {
            lonely = false;
            break;
        }
    }
    if (lonely) {
        lonelyPrimes.push(p)
    }
}

console.log('group count...');
// 打印结果
function groupCount(arr, gpsize) {
    let groups = []
    for (let i = 0; i < arr.length; i++) {
        const gpidx = Math.floor(arr[i] / gpsize)
        groups[gpidx] = groups[gpidx] ? groups[gpidx] + 1 : 1
    }
    groups.forEach(element => {
        console.log(`${element}/${gpsize}: ${element / gpsize}`)
    });
}
groupCount(lonelyPrimes, 100000)
console.log((new Date() - startTime) / 1000)