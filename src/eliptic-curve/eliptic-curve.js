const _a = 1, _b = 1, _p = 23

// task 1
function pointLayOnFunc(p) {
    return (Math.pow(p.x, 3) + p.x + 1) % _p == Math.pow(p.y, 2) % _p
}

// task 2
function getQ(p){
    const sDevided = Math.floor((3 * Math.pow(p.x, 2) + _a))
        , sDevider = 2 * p.y
        , coefDevider = gcdExt(sDevider, _p).y
        , lambda = getMod((getMod(sDevided) * getMod(coefDevider))) 

    console.log(sDevided);
    let q = {}

    q.x = getMod((Math.floor(Math.pow(lambda, 2)) - 2 * p.x))
    q.y = getMod((lambda * (p.x - q.x) - p.y));


    return q;
}

// task 3
function addP(p, pToAdd)
{
    const resultPoint = {}
        , sDevided = pToAdd.y - p.y
        , sDevider = pToAdd.x - p.x
        , coefDevider = gcdExt(sDevider, _p).y
        , lambda = getMod(getMod(sDevided) * getMod(coefDevider))

    resultPoint.x = getMod(Math.floor(Math.pow(lambda, 2)) - p.x - pToAdd.x)
    resultPoint.y = getMod(lambda * (p.x - resultPoint.x) - p.y)

    return resultPoint;
}

function getMod(n, p) {
    return n >= 0
        ? n % _p
        : _p + (n % _p);
}

function gcdExt(a, b) {
    let x0 = 1, xn = 1, y0 = 0, yn = 0, x1 = 0, y1 = 1, f, r = a % b;

    while (r > 0) {
        f = a / b;
        xn = x0 - f * x1;
        yn = y0 - f * y1;

        x0 = x1;
        y0 = y1;
        x1 = xn;
        y1 = yn;
        a = b;
        b = r;
        r = a % b;
    }

    return {x: xn, y: yn, result: b}
}

function getAllPoints(point){
    const q = getQ(point)
        , allPoints = [ point, q ]

    try {
        while (true)
            allPoints.push(addP(allPoints[allPoints.length - 1], point))
    }
    catch (err) {
        return allPoints;
    }
}

function logResults() {

    const p = {x: 4, y: 0}
        , isLaying = pointLayOnFunc(p)
        , q = getQ(p)
        , qPlusP = addP(p, q)
        , allPoints = getAllPoints(p)


    console.log(`Laying on curve: ${isLaying}`)
    console.log(`Q point: X:  ${q.x}, Y: ${q.y}`)
    console.log(`Q + P = (${qPlusP.x}, ${qPlusP.y})`)
    console.log(`All points len: ${allPoints.length}`)
    console.log(`All points:`)
    allPoints.forEach(_ => console.log(`x: ${_.x}, y: ${_.y}`))

}

export {
    logResults,
}