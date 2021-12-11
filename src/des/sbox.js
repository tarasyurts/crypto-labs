import { sBoxes } from './const.js'
import { addEmptyBites } from './utils.js'

function sBox(buffer) {
    return buffer.map((row, ind) => {
        const boxRow = parseInt(row[0] + row[row.length - 1], 2)
            , boxCol = parseInt(row.slice(1, row.length - 1), 2)
        return addEmptyBites((sBoxes[ind][boxRow][boxCol]).toString(2), 4) 
    })   
}

export {
    sBox,
}