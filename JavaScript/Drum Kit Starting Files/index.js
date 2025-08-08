var numberOfDrumButtons = document.querySelectorAll(".drum").length;
//let sounds = ["./sounds/crash.mp3", "./sounds/kick-bass.mp3", "./sounds/snare.mp3", "./sounds/tom-1.mp3","./sounds/tom-2.mp3","./sounds/tom-3.mp3", "./sounds/tom-4.mp3" ];


//play sounds when pressing the buttons
document.querySelectorAll(".drum").forEach(
    (el) => {
    el.addEventListener("click", function(){
    //this.style.color = "white"; // click to change the letter to white
    buttonPressed = this.innerHTML;
    playSounds(buttonPressed);
    playAnimation(buttonPressed);
})}
);

//play sounds when pressing the keys

document.addEventListener("keydown",(e) => {
    playSounds(e.key)
    playAnimation(e.key);
});


function playSounds(letterPressed){
switch (letterPressed) {
    case "w":
        var crash = new Audio ("./sounds/crash.mp3");
        crash.play();
        break;

    case "a":
        var kick = new Audio ("./sounds/kick-bass.mp3");
        kick.play();
        break;

    case "s":
        var snare = new Audio ("./sounds/snare.mp3");
        snare.play();
        break;

    case "d":
        var tom1 = new Audio ("./sounds/tom-1.mp3");
        tom1.play();
        break;

    case "j":
        var tom2 = new Audio ("./sounds/tom-2.mp3");
        tom2.play();
        break;

     case "k":
        var tom3 = new Audio ("./sounds/tom-3.mp3");
        tom3.play();
        break;

    case "l":
        var tom4 = new Audio ("./sounds/tom-4.mp3");
        tom4.play();
        break;

    default:
        console.log(letterPressed);
        break;
   }
};

function playAnimation(letterPressed){
    var activeButton = document.querySelector("."+letterPressed);
    console.log(activeButton);
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100)
}

    







