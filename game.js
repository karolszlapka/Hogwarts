var userClickedPattern = [];

var buttonImages = ["book", "broom", "snitch", "hat"];

var gamePattern = [];

var level = 0;


function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenImage = buttonImages[randomNumber];

    gamePattern.push(randomChosenImage);                   // wrzucamy do game pattern randomowy obrazek

    $("." + randomChosenImage).fadeOut(70).fadeIn(70);     // ściemnienie i pojawienie się

    playSound("./sounds/" + randomChosenImage + ".mp3");   // gramy dźwięk

    level++;                                                // zwiększamy var level o 1

    $("h1").text("LEVEL " + level + "🏆");                         // zwiększamy h1 tekst o 1 level
    
    userClickedPattern = [];

}

$("h1").click(function() {
    
    if(started === false) {
        nextSequence();
        started = true;

        $("h1").text("LEVEL 1🏆");

    } 

});

$(".btn").click(function() {

    var userChosenImage = this.id;                            // var dla id konkretnego obrazka

    userClickedPattern.push(userChosenImage);                 // wrzucamy kliknięty obrazek do userClickedPattern

    playSound("./sounds/" + userChosenImage + ".mp3");        // gramy dźwięk na kliknięcie

    animatePress(userChosenImage);                            // animacja za naciśnięcie - szare tło

    checkAnswer(userClickedPattern.length - 1);
                                                            // sprawdzamy czy userClickedPattern = gamePattern

});




function playSound(name) {

    var audio = new Audio(name);
    audio.play();

}


function animatePress(currentImage) {

    $("." + currentImage).addClass("pressed");

        setTimeout(function(){
            $("." + currentImage).removeClass("pressed");
            }, 100);

}



var started = false;

$(document).keydown(function() {
	
    if(started === false) {
        nextSequence();
        started = true;

        $("h1").text("LEVEL 1🏆");

    }
    
});

// currentLevel - pozycja ostatniego elementu w userClickedPattern







function checkAnswer(currentLevel) {


    if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
        $("h1").text("Game Over! Tap Here To Restart💀");
        
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 800);

        startOver();  

    }

    else if (userClickedPattern[currentLevel] === gamePattern[currentLevel] && userClickedPattern.length === gamePattern.length) {
      
        console.log("brawo, następne");
        
        setTimeout(function(){
            nextSequence();
            }, 1000);
    }

    

}


function startOver() {

    started = false;
    level = 0;
    gamePattern = [];

}


