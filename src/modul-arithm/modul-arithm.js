function gcd(a, b) {
    while (a > 0 && b > 0)
        if (a > b)
            a %= b
        else
            b %= a
    return a + b
}

function gcdExt(a, b) {
    let x0 = 1, xn = 1, y0 = 0, yn = 0, x1 = 0, y1 = 1, f, r = a % b;

    while (r > 0) {
        f = a / b;
        xn = x0 - f * x1;
        yn = y0 - f * y1;

        x0 = x1;
        y0 = y1;
        x1 = xn;
        y1 = yn;
        a = b;
        b = r;
        r = a % b;
    }

    return {xn, yn, result: b}
}

function inverseElement(a, n) {
    return gcdExt(a, n).yn
}

function phi(n) {
    let result = n; 
    for (let i = 2; Math.pow(i, 2) <= n; ++i)
        if (n % i == 0){
            while (n % i == 0)
                n /= i;
            result -= result / i;
        }
    return n > 1 ? result -= result / n : result;
}

function inverseElementEuler(a, p) {
    return Math.pow(a, phi(p)) / p
}

function logResults() {
    let a = 32, b = 55;

    let result = gcdExt(a, b);


    console.log('=====RESULT=====')
    console.log(`gcd(${a}, ${b}) = ${gcd(a, b)}`)
    console.log(`gcdExt(${a}, ${b}) = ` + result.result);
    console.log("inverseElement(7, 11) = " + inverseElement(7, 11));
    console.log("phi(888) = " + phi(888));
    console.log("inverseElementEuler(7, 11) = " + inverseElementEuler(7, 11));
}

export {
    gcd,
    gcdExt,
    inverseElement,
    phi,
    logResults,
}