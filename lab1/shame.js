// notatnik z zajęć
const num1 = document.querySelector('#num1')
const num2 = document.querySelector('#num2')
const num3 = document.querySelector('#num3')
const num4 = document.querySelector('#num4')
const btnCalculate = document.querySelector('#calculate')
const results = document.querySelector('#results')
const sum = document.querySelector('#sum')
const min = document.querySelector('#min')
const max = document.querySelector('#max')
const avg = document.querySelector('#avg')
let numArr = [NaN, NaN, NaN, NaN]

btnCalculate.addEventListener('click', () => {



    numArr[0] = parseInt(num1.value)
    numArr[1] = parseInt(num2.value)
    numArr[2] = parseInt(num3.value)
    numArr[3] = parseInt(num4.value)
    arrValid = removeInvalid(numArr)

    let sumResult = arrValid.reduceRight(function(a,b){return a+b})

    sum.innerHTML = 'Suma: ' + sumResult
    min.innerHTML = 'Min: ' + Math.min.apply(Math, arrValid)
    max.innerHTML = 'Max: ' + Math.max.apply(Math, arrValid)
    avg.innerHTML = 'Avg: ' + sumResult/arrValid.length

})

function removeInvalid(arr){

    let arrValid = []
    arr.forEach(element => {
        if(!isNaN(element)){
            arrValid.push(element)
        }
    });
    return arrValid
}