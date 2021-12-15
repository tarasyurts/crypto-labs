function str2CharCode(str) {
    return str.split('')
        .map(_ => _.charCodeAt(0))
} 

function charCodes2Str(codes) {
    return codes.map(_ => String.fromCharCode(_)).join('')
}

const _hashLength = 64

const _k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]

function hash(text) {
    const _h = [ 
        0x6a09e667,
        0xbb67ae85,
        0x3c6ef372,
        0xa54ff53a,
        0x510e527f,
        0x9b05688c,
        0x1f83d9ab,
        0x5be0cd19
    ]

    // ???

    let textInBytes = str2CharCode(text).concat(0b1000_0000)
    console.log(textInBytes);
    textInBytes = textInBytes.concat([...new Array(_hashLength - textInBytes.length - 1)].map(_ => 0)).concat(text.length)
    let intArray = textInBytes.slice(0, 16)


    intArray = intArray.concat([...new Array(_hashLength - intArray.length)].map(_ => 0))

    for (let i = 16; i < intArray.length; i++) {
        let s0 = rightRotate(intArray[i - 15], 7) ^ rightRotate(intArray[i - 15], 18) ^ rightRotate(intArray[i - 15], 3)
          , s1 = rightRotate(intArray[i - 2], 17) ^ rightRotate(intArray[i - 2], 19) ^ rightRotate(intArray[i - 2], 10)
        intArray[i] = intArray[i - 16] + s0 + intArray[i - 7] + s1;
    }

    let [ a, b, c, d, e, f, g, h ] = [ _h[0], _h[1], _h[2], _h[3], _h[4], _h[5], _h[6], _h[7] ]

    for (let i = 0; i < _hashLength; i++) {
        let s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)
        let ch = (e & f) ^ (~e & g)
        let tmp = h + s1 + ch + _k[i] + intArray[i]
        let s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)
        let maj = (a & b) ^ (a & c) ^ (b & c)
        let tmp2 = s0 + maj
        
        h = g;
        g = f;
        f = e;
        e = d + tmp2
        d = c;
        c = b;
        b = a;
        a = tmp + tmp2
    }

    _h[0] += a
    _h[1] += b
    _h[2] += c
    _h[3] += d
    _h[4] += e
    _h[5] += f
    _h[6] += g
    _h[7] += h


    
    return _h.slice(0, _hashLength / 2)
}


function rightRotate(arrayElement, count) {
    return (arrayElement >> count) | (arrayElement << (32 - count))
}


function logResults() {

    const text = 'my input text'
        , hashed = hash(text)
    console.log('Input ', text);
    console.log('Hashed ', hashed.map(_ => _.toString(16)).join('-'))
}

export {
    logResults,
}