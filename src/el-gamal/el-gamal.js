function str2CharCode(str) {
    return str.split('')
        .map(_ => _.charCodeAt(0))
} 

function charCodes2Str(codes) {
    return codes.map(_ => String.fromCharCode(_)).join('')
}

function randNum(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

function encrypt(arr) {
    const { q, g, key, hSender } = generateEncryptinParams()
        , s = modularExponentiation(hSender, key, q)
        , p = modularExponentiation(g, key, q)
        , hReceiver = modularExponentiation(p, key, q)

    return {
        encrypted: arr.map(_ => _ ^ s),
        hReceiver
    }
}

function decrypt(arr, hReceiver) {
    return arr.map(_ => _ ^ hReceiver)
}

function gcd(a, b) {
    while (a > 0 && b > 0)
        if (a > b)
            a %= b
        else
            b %= a
    return a + b
}

function modularExponentiation(a, b, c) {
    let x = 1, y = a
    
        while (b > 0)
        {
            if (b % 2 != 0)
                x = (x * y) % c
            y = Math.floor((Math.pow(y, 2) % c))
            b /= 2;
        }
        
        return x % c
}

function generateEncryptinParams() {
    const q = randNum(Math.floor(Math.pow(2, 16)), Math.floor(Math.pow(2, 30)))
        , g = randNum(2, q)
        , key = generateKey(q)

    return {
        q,
        g,
        key,
        hSender: modularExponentiation(g, key, q)
    }
}

function generateKey(q) {
    let key
    do {
        key = randNum(Math.floor(Math.pow(2, 16)), q)
    } while (gcd(q, key) != 1)
    return key
}

function logResults() {
    const textToEncrypt = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias quod in libero. Saepe, voluptatibus."
        , textInBytes = str2CharCode(textToEncrypt)
    

    const { encrypted, hReceiver } = encrypt(textInBytes);
    const decryptedBytes = decrypt(encrypted, hReceiver);

    console.log("Message initial: " + textToEncrypt);
    console.log("Message encrypted: " + charCodes2Str(encrypted));
    console.log("Message decrypted: " + charCodes2Str(decryptedBytes));
}


export {
    logResults,
}