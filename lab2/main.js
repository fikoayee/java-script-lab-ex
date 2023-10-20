// notatnik z zajęć

const main = document.querySelector('main')
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.createElement('img');
let dots = document.getElementsByClassName("dot");
dots[0].className += " active";
let isRunning = true

// jednorazowe wykonanie kodu po określonym czasie
const timeoutRef = setTimeout(
    () => {
        main.innerHTML = 'Msg from setTimeout'
    },
    4000
)

// wykonywanie kodu co określony czas
let licznik = 0
let intervalRef = setInterval(
    () => {
        main.innerHTML = `Msg from setInterval: ${licznik++}`
        nextSlide(slideIndex)
    },
    4000
)



let slideIndex = 1;

function startStopSlide(){
    if(isRunning === true){
        isRunning = false
        clearInterval(intervalRef);
        intervalRef = null
    }
    else if (isRunning === false)
    {
        isRunning = true
        intervalRef = setInterval(() => {
            main.innerHTML = `Msg from setInterval: ${licznik++}`
            nextSlide(slideIndex)
        },
        4000)
    }
}

function nextSlide(n){
    let newTranslateX = slideIndex*(600)
    let slides = document.getElementsByClassName("slides");

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }

    if(slideIndex < 5){
        slides[0].style.transition = 'transform 1s'
        slides[0].style.transform = `translateX(-${newTranslateX}px)`
        slideIndex++
        dots[slideIndex-1].className += " active";
    }
    else{
        slides[0].style.transition = 'transform 1s'
        slides[0].style.transform = `translateX(0px)`
        slideIndex = 1
        dots[0].className += " active";
    }
}
 
function prevSlide(n){
    let newTranslateX = (slideIndex-2)*(600)
    let slides = document.getElementsByClassName("slides");

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }

    if(slideIndex > 1 && slideIndex < 6){
        slides[0].style.transition = 'transform 1s'
        slides[0].style.transform = `translateX(-${newTranslateX}px)`
        slideIndex--
        dots[slideIndex-1].className += " active";
    }
    else{
        slides[0].style.transition = 'transform 1s'
        slides[0].style.transform = `translateX(-2400px)`
        dots[4].className += " active";
        slideIndex = 5
    }
}

function currentSlide(n){
    let slides = document.getElementsByClassName("slides");
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
    if(slideIndex < n){
        let newTranslateX = (n-1)*(600)
        slides[0].style.transition = 'transform 1s'
        slides[0].style.transform = `translateX(-${newTranslateX}px)`
        slideIndex = n
        dots[slideIndex-1].className += " active";
    }
    else if(slideIndex >= n){
        let newTranslateX = (n-1)*(600)
        slides[0].style.transition = 'transform 1s'
        slides[0].style.transform = `translateX(-${newTranslateX}px)`
        slideIndex = n
        dots[slideIndex-1].className += " active";
    }
}

function showLightbox(url){
    startStopSlide();
    let lightbox = document.getElementsByClassName("lightbox");
    let lightboxImg = document.getElementsByClassName("lightboxImg");
    lightboxImg[0].src = url
    lightbox[0].style.display = 'flex'
    console.log(lightbox[0])

}
function hideLightbox(){
    startStopSlide();
    let lightbox = document.getElementsByClassName("lightbox");
    lightbox[0].style.display = 'none'
}




  