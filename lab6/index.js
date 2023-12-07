
window.addEventListener('deviceorientation', onDeviceMove)

// alpha - z - 0
// beta - y - 90
// gamma - x - 0

function onDeviceMove(event) {
    console.log(event)
}

function moveZ(alphaValue){

}

function animate() {
    //    console.log(Date.now())
    // requestAnimationFrame(animate)
}

requestAnimationFrame(animate)