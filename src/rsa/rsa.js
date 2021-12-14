// import bigInt from '../../node_modules/big-integer/BigInteger.js'

function generate(keysize) {

    function random_prime(bits) {
        var min = bigInt(6074001000).shiftLeft(bits - 33)
        var max = bigInt.one.shiftLeft(bits).minus(1)
        while (true) {
            var p = bigInt.randBetween(min, max)
            if (p.isProbablePrime(256)) return p
        }
    }

    var e = bigInt(65537),
        p, q, lambda;


    do {
        p = random_prime(keysize / 2)
        q = random_prime(keysize / 2)
        lambda = bigInt.lcm(p.minus(1), q.minus(1))
    } while (bigInt.gcd(e, lambda).notEquals(1) || p.minus(q).abs().shiftRight(keysize / 2 - 100).isZero())

    return {
        n: p.multiply(q),
        e: e,
        d: e.modInv(lambda)
    }
}


function encrypt(m, n, e) {
    return bigInt(m).modPow(e, n)
}


function decrypt(c, d, n) {
    return bigInt(c).modPow(d, n)
}

export { 
    generate,
    encrypt,
    decrypt,
}