const startTime = new Date();
const MAX = 10 ** 8

function EulerSieve(n) {
    const primes = [];
    let eularboard = new Array(n + 1).fill(true);
    for (let i = 2; i <= n; i++) {
        if (eularboard[i]) {
            primes.push(i);
        }
        for (let j = 0; j < primes.length; j++) {
            if (i * primes[j] > n) break;
            eularboard[i * primes[j]] = false;
            if (i % primes[j] === 0) break;
        }
    }
    return primes
}

const primes = EulerSieve(MAX)
const dp = []

function factorOrdersProduct(n) {
    if (n === 1) { return 0 }
    // while (n % 2 === 0) {
    //     n = n / 2 // 因为 π(2) = 1，所以索引号乘积是不变的。
    //     if (n === 1) { return 1 }
    // }
    if (dp[n]) { return dp[n] }
    const init = n
    const sqrt_n = Math.sqrt(n)
    let indices = 1

    for (let i = 0; i < primes.length; i++) {
        const p = primes[i];
        if (p > sqrt_n) break;
        while (n % p === 0) {
            indices = indices * (i + 1)
            n = n / p
            if (dp[n]) {
                indices = indices * dp[n];
                n = 1
                break
            }
        }
        if (n === 1) break;
    }

    if (n > 1) {
        const idx = primes.indexOf(n);
        if (idx === -1) {
            throw new Error(`Math crisis ${n}`);
        }
        indices = indices * (idx + 1)
    }

    dp[init] = indices
    return indices
}

const lonelyPrimes = []
for (let i = 0; i < primes.length; i++) {
    const p = primes[i];
    let lonely = true
    for (let m = 2; m < p / 2; m++) {
        if (factorOrdersProduct(m) + factorOrdersProduct(p - m) === i + 1) {
            lonely = false
            break
        }
    }
    if (lonely) {
        // console.log(p)
        lonelyPrimes.push(p)
    }
}

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