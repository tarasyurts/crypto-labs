function str2CharCode(str) {
    return str.split('')
        .map(_ => _.charCodeAt(0))
} 

function charCodes2Str(codes) {
    return codes.map(_ => String.fromCharCode(_)).join('')
}

const _hashLength = 64

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

const _k = [

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
        let ch = (e & f) ^ ((e ^ Number.MAX_SAFE_INTEGER) & g)
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

    _h[0] += a;
    _h[1] += b;
    _h[2] += c;
    _h[3] += d;
    _h[4] += e;
    _h[5] += f;
    _h[6] += g;
    _h[7] += h;


    
    return _h.slice(0, _hashLength / 2)
}


function rightRotate(arrayElement, count) {
    return (arrayElement >> count) | (arrayElement << (32 - count))
}