function power(x, y, p) {

    let res = 1;

    x = x % p;
    while (y > 0) {

        if (y & 1)
            res = (res * x) % p;

        y = y >> 1;
        x = (x * x) % p;
    }
    return res;
}

function miillerTest(d, n) {

    let a = 2 + Math.floor(Math.random() * (n - 2)) % (n - 4);

    let x = power(a, d, n);

    if (x == 1 || x == n - 1)
        return true;

    while (d != n - 1) {
        x = (x * x) % n;
        d *= 2;

        if (x == 1)
            return false;
        if (x == n - 1)
            return true;
    }

    return false;
}

function isPrime(n, k) {

    if (n <= 1 || n == 4) return false;
    if (n <= 3) return true;

    let d = n - 1;
    while (d % 2 == 0)
        d /= 2;

    for (let i = 0; i < k; i++)
        if (!miillerTest(d, n))
            return false;

    return true;
}

export {
    isPrime,
}