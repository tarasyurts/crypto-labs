
function convertToBinaries(message) {
    const enlargedChunk = message.split('')
        .map(toBinaryString)
        // for cyrilic
        .map(_ => addEmptyBites(_, 16))

    return changeChunkRowLen(enlargedChunk, 8)
}

function toBinaryString(symbol) {
    return symbol.charCodeAt(0).toString(2)
} 

function addEmptyBites(binaryString, totalLength) {
    return `${'0'.repeat(totalLength - binaryString.length)}${binaryString}`
}

function sliceBinaryStringIntoChunks(binaryString, chunkSize) {
    return sliceIntoChunks(binaryString.split(''), chunkSize).reverse().map(_ => _.join(''))
}

function joinBinaryString(binaryStrings) {
    return binaryStrings.reverse().join('')
}

function sliceIntoChunks(arr, chunkSize, fulfillWith) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }

    if (fulfillWith) {
        if (res[res.length - 1].length < chunkSize) {
            [...Array(chunkSize - res[res.length - 1].length).keys()]
                .forEach(_ => res[res.length - 1].push(fulfillWith))
        }
    }
    return res;
}

function getElByIndex(twoDArray, index) {
    return twoDArray.flat(2).join('').split('')[index]
}

function createEmptyBinaryChunk(rows, cols) {
    return [...Array(rows).keys()].reduce((acc, _) => [...acc, addEmptyBites('', cols)], [])
}

function binaryDataIntoString(buffer) {
    // for cyrilic
    return sliceIntoChunks(buffer, 2)
        .map(_ => joinBinaryString(_))
    //
        .map(_ => String.fromCharCode(parseInt(_, 2)))
        .join('')
}

function changeChunkRowLen(chunk, rowLength) {
    if (chunk[0].length === rowLength)
        return chunk
    return sliceBinaryStringIntoChunks(joinBinaryString(chunk), rowLength)
}

function shift(arr, times, side) {
    return side === 'left' 
            ? [ ...arr.slice(times), ...arr.slice(0, times) ]
            : [ ...arr.slice(-times), ...arr.slice(0, -times) ]
}

function XORChunks(chunkA, chunkB) {
    console.log('aChunk', chunkA);
    console.log('bChunk', chunkB);
    
    let [a, b] = [joinBinaryString(chunkA), joinBinaryString(chunkB)]

    console.log('aBin', a)
    console.log('aBin', b)

    return sliceBinaryStringIntoChunks(addEmptyBites(a.split('').reduce((acc, ch, idx) => [...acc, (parseInt(ch) ^ parseInt(b[idx])).toString(2) ], []).join(''), chunkA[0].length * chunkA.length), chunkA[0].length)
}

export {
    convertToBinaries,
    toBinaryString,
    addEmptyBites,
    sliceBinaryStringIntoChunks,
    joinBinaryString,
    sliceIntoChunks,
    getElByIndex,
    createEmptyBinaryChunk,
    binaryDataIntoString,
    changeChunkRowLen,
    shift,
    XORChunks,
}