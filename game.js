var gamePattern = [];
var userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
var level = 1;

$(document).on("keydown", function() {
    $("h1").text("Level "+ level);
    nextSequence();
});

$(".btn").on("click", function () {
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);

if(gamePattern.length === userClickedPattern.length){
    setTimeout(function (){
        if (userClickedPattern[level-1] === gamePattern[level-1]){
            level++;
            userClickedPattern = [];
            $("h1").text("Correct!");
            var correctAudio = new Audio("sounds/correct.mp3");
            correctAudio.play();
            setTimeout(function() {
                $("h1").text("Level "+ level);
                nextSequence();
            }, 1200);
            
        }else{ 
            var wrongAudio = new Audio("sounds/wrong.mp3");
            wrongAudio.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("h1").text("Press Any Key to Restart");
                resetGame();
                $("body").removeClass("game-over");
            }, 200);
        }
    }, 1000);
    
}
});

function nextSequence()
{
    
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
}

function playSound(pressedButton){
    var audio = new Audio("sounds/" + pressedButton + ".mp3")
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");   
    }, 100);
}


function resetGame(){
    gamePattern = [];
    userClickedPattern = [];
    level = 1;
}

