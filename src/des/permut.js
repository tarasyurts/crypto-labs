import { initPermMatrix, initInvPermMatrix, perm32, pc1left, pc1right, pc2 } from './const.js'
import { getElByIndex, createEmptyBinaryChunk } from './utils.js'

function initPerm(data) {
    return perm(data, initPermMatrix)
}

function endPerm(data) {
    return perm(data, initInvPermMatrix)
}

function sBoxPerm(data) {
    return perm(data, perm32)
}

function pc1Perm(data, side) {
    return perm(data, side === 'left' ? pc1left : pc1right)
}

function pc2Perm(data) {
    return perm(data, pc2)
}

function perm(dataMatrix, intecesMatrix) {
    const chunk = createEmptyBinaryChunk(intecesMatrix.length, intecesMatrix[0].length)
    intecesMatrix.forEach((row, rowInd) => {
        const bStr = chunk[rowInd].split('')
        row.forEach((val, colInd) => {
            bStr[colInd] = getElByIndex(dataMatrix, val - 1)
        })
        chunk[rowInd] = bStr.join('')
    })
    return chunk
}

export { 
    initPerm,
    endPerm,
    
    sBoxPerm,
    pc1Perm,
    pc2Perm,
}