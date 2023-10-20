const normalSum = document.querySelector('#normalSum')
const normalMin = document.querySelector('#normalMin')
const normalMax = document.querySelector('#normalMax')
const normalAvg = document.querySelector('#normalAvg')
let normalNumArr = [NaN, NaN, NaN, NaN]
let nonExistingIds = [4]

function liveCalculationNormal(){

    arrValid = removeInvalid(normalNumArr)
    let sumResult = arrValid.reduceRight(function(a,b){return a+b})

    normalSum.innerHTML = 'Suma: ' + sumResult
    normalMin.innerHTML = 'Min: ' + Math.min.apply(Math, arrValid)
    normalMax.innerHTML = 'Max: ' + Math.max.apply(Math, arrValid)
    normalAvg.innerHTML = 'Avg: ' + sumResult/arrValid.length
}

function passValue(id){
    const normalNumId = id+1
    const element = document.getElementById('normalNum'+normalNumId)
    normalNumArr[id] = parseInt(element.value)

    normalNumArr.forEach(element => {
        console.log(element)
    });
}

function addInputField(){
     if(nonExistingIds.length != 0){
        let numId = Math.min.apply(Math, nonExistingIds)
        let passId = numId-1

        let input = document.createElement('input')
        let div = document.getElementById('InputFields')
        input.setAttribute('id', 'normalNum'+numId)
        input.setAttribute('onkeyup', 'passValue('+passId+'); liveCalculationNormal()')
        div.appendChild(input)

        let id = nonExistingIds.indexOf(numId)
        nonExistingIds.splice(id, 1)
        console.log(nonExistingIds)
     }
}

function removeInputFields(){
    const normalNumId = [1, 2, 3, 4]
    let existingNumId = normalNumId.filter(function(element){
        return nonExistingIds.indexOf(element) === -1
    })
    
    existingNumId.forEach(num => {
        if(!document.getElementById('normalNum'+num).value.trim().length > 0){
            let id = num-1
            normalNumArr[id] = NaN
            document.getElementById('normalNum'+num).remove()
            nonExistingIds.push(num)
        }
    });
}
