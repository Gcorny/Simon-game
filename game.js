var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level  = 0;
var userMove = userClickedPattern.length;
var gameMove = 0;

$(document).keydown(function(){
  if(!gameStart){
    nextSequence();

    gameStart = true;
  }
});


// this part of code snippet is for user to click
// the button
$(".btn").click(function(){
  var userChosencolor = this.id;
  userClickedPattern.push(userChosencolor);
  console.log("user pattern");
  console.log(userClickedPattern);
  playSound(userChosencolor);
  animatePress(userChosencolor);
  userMove++;
  checkAnswer();
});


// check whether the answer is correct
// resatrt the game if incorrect
// otherwise level up
function checkAnswer(){
  for(var i = 0; i<userMove;i++){
    if(gamePattern[i] != userClickedPattern[i]){
      gamePattern = [];
      userClickedPattern = [];
      level = 0;
      gameOver();
    }

  }
  if(userMove == gameMove){
    userClickedPattern = [];
    userMove = 0;
    setTimeout(nextSequence(),20000);

  }
}

//need to fix this function as well
function gameOver(){
  playSound("wrong");
  $("#level-title").text("Game Over!");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },2000);
  gameMove = 0;
  $("#level-title").text("Game Over, Press Any Key to restart");
  gameStart = false;
}

///need to fix this damn part
function nextSequence(){
  $("#level-title").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  console.log("game pattern");
  console.log(gamePattern);
  gameMove++;

}



function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);

}

//play the sound based on the button clicked or selected
function playSound(key){
  switch(key){
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    case "wrong":
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      break;
  }
}
