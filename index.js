var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var start = true;
var level = 0;

function nextSequence()
{
  userClickedPattern = [];
  level = level +1;
  $("#level-title").text("Level: " + level);

  var randomNumber = Math.random()*4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeToggle(100).fadeToggle(100);

  playSound(randomChosenColor)


}


function playSound(name)
{
  var aud = new Audio("sounds/" + name + ".mp3");
  aud.play();
}

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});


function animatePress(currentColour)
{
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("."+ currentColour).removeClass("pressed");
  }, 100);
}


document.addEventListener("keydown", function() {
  if (start === true) {
    nextSequence();
    start = false;
  }
});


function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  }
  else {
    console.log("wrong");
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver()
{
  level = 0;
  gamePattern = [];
  start = true;
}
