// notatnik z zajęć
const ziewNum1 = document.querySelector('#ziewNum1')
const ziewNum2 = document.querySelector('#ziewNum2')
const ziewNum3 = document.querySelector('#ziewNum3')
const ziewNum4 = document.querySelector('#ziewNum4')
// const ziewResults = document.querySelector('#ziewResults')
const ziewSum = document.querySelector('#ziewSum')
const ziewMin = document.querySelector('#ziewMin')
const ziewMax = document.querySelector('#ziewMax')
const ziewAvg = document.querySelector('#ziewAvg')
let ziewNumArr = [NaN, NaN, NaN, NaN]
function liveCalculation(){
    

    ziewNumArr[0] = parseInt(ziewNum1.value)
    ziewNumArr[1] = parseInt(ziewNum2.value)
    ziewNumArr[2] = parseInt(ziewNum3.value)
    ziewNumArr[3] = parseInt(ziewNum4.value)
    arrValid = removeInvalid(ziewNumArr)
    let sumResult = arrValid.reduceRight(function(a,b){return a+b})

    ziewSum.innerHTML = 'Suma: ' + sumResult
    ziewMin.innerHTML = 'Min: ' + Math.min.apply(Math, arrValid)
    ziewMax.innerHTML = 'Max: ' + Math.max.apply(Math, arrValid)
    ziewAvg.innerHTML = 'Avg: ' + sumResult/arrValid.length
}