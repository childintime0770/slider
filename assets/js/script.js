// Declaring Variables
const sliderDiv = document.getElementById("slider");
const imageSelector = document.getElementById("image-selector");
const leftArrow = document.getElementById("left");   
const rightArrow = document.getElementById("right");   
const speedRange = document.getElementById("speed");
let speed = calculateRange();
let counter = 1;
let myInterval; 

// Declaring Functions
function changeImage() {
    
    // if(counter < 0) {
    //     counter = sliderDiv.children.length - 1;
    // }

    const selectedImage = document.querySelector(".selected-image");
    if(selectedImage) {
        selectedImage.classList.remove("selected-image");
    }

    sliderDiv.children[counter].classList.add("selected-image");

    const selectedButton = document.querySelector(".active");
    if(selectedButton) {
        selectedButton.classList.remove("active");
    }

    imageSelector.children[counter].classList.add("active");

    counter++;
    
    if(counter >= sliderDiv.children.length) {
        counter = 0;
    }

}

function startInterval() {
    myInterval = setInterval(changeImage, speed);
}

function stopInterval() {
    if(myInterval) {
        clearInterval(myInterval);
        myInterval = null;
    }
}

function calculateRange(){
    return +speedRange.getAttribute("max") - (+speedRange.value) + (+speedRange.getAttribute("min"));
}


// Declaring Listeners

sliderDiv.addEventListener("mouseenter", stopInterval);
sliderDiv.addEventListener("mouseleave", startInterval);

imageSelector.addEventListener("click", event => {
    if(event.target !== imageSelector) {
        stopInterval();
        counter = +event.target.getAttribute("data-id");
        changeImage();
        startInterval();
    }
})

leftArrow.addEventListener("mouseenter", stopInterval);
rightArrow.addEventListener("mouseenter", stopInterval);
leftArrow.addEventListener("mouseleave", startInterval);
rightArrow.addEventListener("mouseleave", startInterval);

rightArrow.addEventListener("click", changeImage);

leftArrow.addEventListener("click", () => {
    counter -= 2;
    changeImage();
});

speedRange.addEventListener("change", () => {
    speed = calculateRange();
    stopInterval();
    startInterval();
});

// Run Program
startInterval();