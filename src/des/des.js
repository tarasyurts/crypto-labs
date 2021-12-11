import * as u from './utils.js'
import { initPerm, endPerm, sBoxPerm, pc1Perm, pc2Perm } from './permut.js'
import { pBoxExt } from './pbox.js'
import { sBox } from './sbox.js'
import { shifts } from './const.js'

export default function des(message, key, mode = 'encode') {
    const binaryMessage = u.convertToBinaries(message)
        , [chunkedKey] = u.sliceIntoChunks(u.convertToBinaries(key), 8, u.addEmptyBites('', 8))

    return u.sliceIntoChunks(binaryMessage, 8, u.addEmptyBites('', 8))
        .reduce((acc, chunk) => acc += computeDesChunk(chunk, chunkedKey, mode), '')
}

function computeDesChunk(chunk, key, mode = 'encode') { 
    const [initLChunk, initRChunk] = u.sliceIntoChunks(initPerm(chunk), 4)
    let [lChunk, rChunk] = [u.changeChunkRowLen(initLChunk, 4), u.changeChunkRowLen(initRChunk, 4)]
    const [keyLPerm, keyRPerm] = [pc1Perm(key, 'left'), pc1Perm(key, 'right')] 

    for (let i = 0; i < 16; i++) {
        if (i == 3) debugger
        const extended = pBoxExt(rChunk).map(_ => _.join(''))
            , shiftedKey = [u.joinBinaryString(keyLPerm), u.joinBinaryString(keyRPerm)]
                .map(_ => u.shift(_, shifts[i], mode === 'encode' ? 'left' : 'right').join(''))
            , keyPerm = pc2Perm(shiftedKey)
            , chunkXORkey = u.XORChunks(extended, keyPerm)
            , roundCompute = sBoxPerm(sBox(chunkXORkey))
            , tmpRChunk = rChunk
        
        rChunk = u.XORChunks(lChunk, roundCompute)
        lChunk = tmpRChunk
    }

    const binaryResult = endPerm([...rChunk, ...lChunk])

    return u.binaryDataIntoString(binaryResult)
}

// TEST
const randSymbols = [
    'tarasyjs',
    'ertyuioc',
    'GMjmlmlJ',
    'DJISNLKS',
    'MLSJMIEJ',
    'ciojoiuN',
    'рлктідод',
    'ротллрры',
]

const tstBuff = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [16, 17, 18, 19],
    [20, 21, 22, 23],
    [24, 25, 26, 27],
    [28, 29, 30, 31],
]

const tst32 = [
    '010011',
    '011100',
    '111010',
    '110100',
    '000101',
    '111011',
    '101001',
    '010101',
]