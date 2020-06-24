var inquirer =require("inquirer");
var colors =require("colors");
var Word =require("./Words.js");

var randomWord;
var remainingGuesses= 9;
var lettersGuessed=[];

var plants=[
    "Elephant",
    "Black Bear",
    "Barracuda",
    "Bearded Dragon",
    "Beaver",
    "Cheetah",
    "Dolphin",
    "Bumblee Bee",
    "Honey Bee",
    "Portuguese Water Dog",
    "Komodo Dragon",
    "Gila Monster",
    "Ratlesnake",
    "Black Mamba",
    "Poison Dart Frog",
    "Platypus",
    "Porcupine",
    "Royal Penguin",
    "Puffer Fish",
    "Mongoose",
    "Ostrich",
    "Ocelot",
    "Old English Sheepdog",
    "Opossum",
    "Kangaroo",
    "King Crab",
    "Jellyfish",
    "Japanese Macaque",
    "Pygmy Hippopotamus",
    "Nightingale"
]

//function to Start Game

function startGame(){
    inquirer
    .prompt([
        {
        name:"gameStart",
        type:"confirm",
        message:"Are you ready to test your animal knowledge?".blue
        }
    ]).then(function(answer){
        if(answer.gameStart){
        remainingGuesses=9;
        lettersGuessed=[];
        console.log("Guess the Animal!".green)
        if(plants.length >0){
            var random =Math.floor(Math.random()* plants.length);
            randomWord =plants[random];
            plants.splice(random, 1);
            // console.log(plants)
            // console.log(randomWord);


            //using word constructor to turn the plant into a word object
            randomWord = new Word(randomWord);
            
            // underscores for user to know how many letters
            console.log(randomWord.display());
            userHandler();
        } else{
            console.log("You know your Animals!!".yellow,"There are no more Animals to guess".red)
        }
    } else{
        console.log("No Problem! Come back Soon!".brightGreen);
        
    }
    })

    //function to allow user to guess a word

    function userHandler(){
        inquirer
        .prompt([{
            name:"userGuess",
            type: "Input",
            message:"Guess a letter: ".magenta

        }]).then(function(answer){
            //creatin variable to use it more easily down the function that turns all letters to upper case letters
            var userGuess = answer.userGuess.toUpperCase();

            //tell the user if a letter has been already used
            if(lettersGuessed.includes(userGuess)){
                console.log("You already guessed the letter", colors.yellow(userGuess.toUpperCase()),". Try another!");
                userHandler();
            } else{
                //add the letter the user guessed to the array
                lettersGuessed.push(userGuess);

                //check if the letter is right - this uses the check from the word constructor that uses it from letter.js
                randomWord.check(userGuess)

                //if the letter is correct, show it on the console
                var show = randomWord.display();
                console.log(show);

                //if the user guesses wrong
                if(!show.includes(userGuess)){
                    remainingGuesses--;
                
                //keep track of the number of guesses left
                console.log("Wrong Letter".red,"you have", remainingGuesses, "guesses left");
                
                }else{
                    console.log("You Got It!".green);
                }
                //if the user wins
                if(!show.includes("_")){
                    console.log("Woohoo! You won!".green);
                    keepPlaying();
                }
                else if(remainingGuesses>0){
                    userHandler();
                }
                else{
                    //user lost
                    console.log("Boo...you lost! Try again!".cyan);
                    restart();
                }
            }
        })
    }


   //function to restart game

   function restart(){
       inquirer
       .prompt([{
           name:"restart",
           type:"confirm",
           message:"Would you like to give it another try?".brightCyan
       }]).then(function(answer){
           if(answer.restart){
               startGame();
           }else{
               console.log("It has been real!".brightBlue, "Thanks for playing!".brightRed, "See you soon!".brightWhite);
               
           }
       })
   }

}

function keepPlaying(){
    inquirer.prompt([{
        name:"keepGoing",
        type:"confirm",
        message:"Great job! Would you like to do another?".green
    }]).then(function(answer){
        if(answer.keepGoing){
            startGame();
        }else{
            console.log("It has been real!".brightBlue, "Thanks for playing!".brightRed, "See you soon!".brightWhite);
        }
    })
}

startGame();