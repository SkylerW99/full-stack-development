let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameLevel = 0;
let result;
let started = false;

$(document).keypress(function() {
    if (started == false){
    gameLevel = 0;
    $("#level-title").html("level "+ gameLevel);
    userClickedPattern = [];
    gamePattern = [];
    nextSequence();
    started = true;
}});

//generate random number
function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    buttonAnimation(randomChosenColor);
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    return gamePattern;
}

//identify the button user clicks
$(".btn").click(function(){
let userChosenColor = $(this).attr("id");

playSounds(userChosenColor);
buttonAnimation(userChosenColor);

userClickedPattern.push(userChosenColor);
console.log("userClickedPattern:" + userClickedPattern);
compareResults(userClickedPattern.length-1);
});

function compareResults(currentLevel){
    //compare array items
     console.log("gamePattern.length:" + gamePattern.length);
     console.log("userClickedPattern.length:" + userClickedPattern.length);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            result = "match";
        } else {
            result = "waiting for more input";
        }
    }else{
        result = "game over";
    }

     //next step if match
     if (result == "match"){
        gameLevel++;
        $("#level-title").html("level "+ gameLevel);
        userClickedPattern = [];
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }   

    //if game over
    if (result == "game over"){
        playSounds("gameOver");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        $("#level-title").html("Game over. Press any key to restart.");
        started = false;
    }

};


//play pressed sounds
function playSounds(fileName){
    let audio = new Audio("sounds/"+fileName+".mp3");
    audio.play();
};

//Play button animation
function buttonAnimation(col){
    $("." + col).addClass("pressed");
    setTimeout(function() {
        $("." + col).removeClass("pressed");
    }, 100);
    playSounds(col);
};

