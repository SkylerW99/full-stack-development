
//randomly select from 1-6
var numberSelected1 = Math.floor (Math.random() * 6) + 1;    
var numberSelected2 = Math.floor (Math.random() * 6) + 1;

var SelectImg1 = document.querySelector(".img1");
var SelectImg2 = document.querySelector(".img2");
a
SelectImg1.setAttribute("src","./images/dice" + numberSelected1 +".png");
SelectImg2.setAttribute("src","./images/dice" + numberSelected2 +".png");

var heading = document.querySelector("h1");

if (numberSelected1 > numberSelected2){
    heading.innerHTML = "🏆 Player 1 wins!";
} else if (numberSelected1 < numberSelected2){
    heading.innerHTML = "🏆 Player 2 wins!";
} else {
    heading.innerHTML = "Draw!";
}



