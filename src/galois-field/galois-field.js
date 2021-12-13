export default function galoisField(aHex, bHex, primitive) {
    const aBin = parseInt(aHex, 16).toString(2).split('').reverse()
        , bBin = parseInt(bHex, 16).toString(2).split('').reverse()

    const [aPolyn, bPolyn] = [getIndecies('1', aBin), getIndecies('1', bBin)]
        , multyplied = multPolyns(aPolyn, bPolyn)
        , binaryMult = polynToBinary(multyplied)
        , res = galoisMult(binaryMult, primitive)

    console.log('aPolyn', aPolyn)
    console.log('bPolin', bPolyn)
    console.log('multPolyns', multyplied)
    console.log('polynToBinary', binaryMult)
    console.log('res', res)
    return parseInt(res, 2).toString(16)
}

function getIndecies(el, arr) {
    return arr.reduce((acc, val, i) => {
        if (el === val) return [ ...acc, i ]
        return acc
    } ,[])
}

function multPolyns(polynA, polynB) {
    const allD = polynA.reduce((acc, val) => [...acc, ...polynB.map(_ => _ + val)], [])
    return [...new Set(allD)].filter(_ => countElAmount(allD, _) % 2 !== 0).sort((a, b) => b - a)
}

function countElAmount(arr, el) {
    return arr.filter(_ => _ === el).length
}

function polynToBinary(polyn){
    return polyn
        .sort((a, b) => b - a)
        .reduce((acc, val) => {
            acc[val] = 1
            return acc
        }, '0'.repeat(polyn[0]+1).split(''))
        .reverse().join('')
}

function XORBinStrings(binA, binB) {
    const len = Math.abs(binA.length - binB.length)
        , [a, b] = [binA.padStart(len, '0'), binB.padStart(len, '0')] 
    return a.split('').reduce((acc, ch, idx) => [...acc, (parseInt(ch) ^ parseInt(b[idx])).toString(2) ], []).join('')
}

function leftXOR(fir, sec) {
    let startInd = fir.indexOf('1')
    let xorRes = XORBinStrings(fir.slice(startInd, startInd + sec.length), sec)
    return xorRes + fir.slice(startInd + xorRes.length)
}

function galoisMult(binVal, binMod) {
    if (binVal.length <= binMod.length)
        return XORBinStrings(binVal, binMod)

    let currBin = binVal
        , degreesLeft = currBin.length - binMod.length

    while (degreesLeft > 0) {
        currBin = leftXOR(currBin, binMod)
        degreesLeft = currBin.length - binMod.length
    }

    return currBin
}