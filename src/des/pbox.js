function pBoxExt(buffer) {
    return buffer.reduce((acc, row, ind, arr) => [ 
        ...acc, 
        [ arr[ind - 1 >= 0 ? ind - 1 : arr.length - 1][row.length - 1], ...row, arr[ind + 1 < arr.length ? ind + 1 : 0][0] ]  
    ], [])
}

export { pBoxExt }