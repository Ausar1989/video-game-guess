//This is a giant object in which all of the game's logic and variables will be stored.
var videoGameGuessGame = {
  wordsToPick: {
    akuaku: {
      picture: "AkuAku.jpg",
      song: "Aku Aku Invincibilty",
      preview: "https://vgmsite.com/soundtracks/crash-bandicoot-series-sound-box/twuvjgdsxs/01-26.%20Aku%20Aku.mp3"  
    },
    bowser: {
     picture: "Bowser.jpg",
     song: "Bowser boss battle",
     preview: "https://vgmsite.com/soundtracks/super-mario-world-snes-gamerip/jitlswgzmy/07%20Bowser%27s%20Castle%20Emerges.mp3"  
    },
    cj: { 
    picture: "CJ.jpg",
    song: "san andreas music",
    preview:"https://nf1f8200-a.akamaihd.net/downloads/ringtones/files/mp3/gta-san-andreas-6042.mp3"
    },
    crashbandicoot: { 
    picture:  "CrashBandicoot.jpg",
    song: "Crash Bandicoot music",
    preview: "https://vgmsite.com/soundtracks/crash-bandicoot-4-the-wrath-of-cortex-psx-gamerip/mttonthfae/01%20The%20Wrath%20Of%20Cortex.mp3"
    },
    donkeykong: {
    picture: "DonkeyKong.jpg",
    song: "Donkey Kong Song",
    preview: "https://vgmsite.com/soundtracks/donkey-kong-64-game-music/nixzbfap/Tag%20Barrel%20Donkey.mp3"
    },
    drneocortex: {
    picture: "DrNeoCortex.jpg",
    song: "villain battle song",
    preview: "https://vgmsite.com/soundtracks/crash-bandicoot-4-the-wrath-of-cortex-psx-gamerip/nifuamviap/30%20Cortex%20Vortex.mp3"
    },
    franklin: {
    picture: "Franklin.jpg",
    song: "gta5 theme song",
    preview: "https://nf1f8200-a.akamaihd.net/downloads/ringtones/files/mp3/gta-san-andreas-6042.mp3"
    },
    knuckles: {
    picture: "Knuckles.jpg",
    song: "knuckles song",
    preview: "https://s3-us-west-2.amazonaws.com/shq-media/media/games/sonicthehedgehog-8bit/mp3/10%20-%20Jungle%20Zone.mp3"
    },
    robotnik: {
    picture: "robotnik.jpg",
    song: "Dr Robotnik battle",
    preview: "https://s3-us-west-2.amazonaws.com/shq-media/media/games/sonicthehedgehog-8bit/mp3/08%20-%20Boss%20Theme.mp3"
    },
    solidsnake: {
    picture: "SolidSnake.jpg",
    song: "Metal Gear Solid song",
    preview: "https://vgmsite.com/soundtracks/metal-gear-solid-virtual-existence/bvvfmzaymi/05%20-%20Objective%20Complete.mp3"
    },
    sonic: {
    picture: "Sonic.jpg",
    song: "Sonic The Hedgehog",
    preview: "https://s3-us-west-2.amazonaws.com/shq-media/media/games/sonicspinball/mp3/Spinball%20Theme.mp3"
    },
    supermario: {
    picture: "SuperMario.jpg",
    song: "Super Mario Song",
    preview: "https://vgmsite.com/soundtracks/super-mario-world-original-soundtrack/vmrblynm/17%20-%20Invincible%20Bgm.mp3"
    },
    trevor: {
    picture: "Trevor.jpg",
    song: "Trevor",
    preview: "https://nf1f8200-a.akamaihd.net/downloads/ringtones/files/mp3/gta-san-andreas-6042.mp3"
    }
  },

 
  // Variables that set the initial state of our wordGuess game.
  wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

  // The setupGame method is called when the page first loads.
  setupGame: function() {
    // Here we pick a random word.
    var objKeys = Object.keys(this.wordsToPick);
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

    // Split the chosen word up into its individual letters.
    this.lettersOfTheWord = this.wordInPlay.split("");
    // Builds the representation of the word we are trying to guess and displays it on the page.
    // At the start it will be all underscores since we haven't guessed any letters ("_ _ _ _").
    this.rebuildWordView();
    // This function sets the number of guesses the user gets, and renders it to the HTML.
    this.processUpdateTotalGuesses();
  },

  // This function is run whenever the user guesses a letter..
  updatePage: function(letter) {
    // If the user has no guesses left, restart the game.
    if (this.guessesLeft === 0) {
      this.restartGame();
    }
    // Otherwise...
    else {
      // Check for and handle incorrect guesses.
      this.updateGuesses(letter);

      // Check for and handle correct guesses.
      this.updateMatchedLetters(letter);

      // Rebuild the view of the word. Guessed letters are revealed, non-guessed letters have a "_".
      this.rebuildWordView();

      // If the user wins, restart the game.
      if (this.updateWins() === true) {
        this.restartGame();
      }
    }

  },

  // This function governs what happens when the user makes an incorrect guess (that they haven't guessed before).
  updateGuesses: function(letter) {
    // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
    // -1 means not in the array because array starts at 0
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {

      // Add the letter to the guessedLetters array.
      this.guessedLetters.push(letter);

      // Decrease guesses by one.
      this.guessesLeft--;

      // Update guesses remaining and guesses letters on the page.
      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML =
      this.guessedLetters.join(", ");
    }
  },

  // This function sets the initial guesses the user gets.
  processUpdateTotalGuesses: function() {
    // The user will get more guesses the longer the word is.
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;

    // Render the guesses left to the page.
    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },

  // This function governs what happens if the user makes a successful guess.
  updateMatchedLetters: function(letter) {
    // Loop through the letters of the "solution".
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      // If the guessed letter is in the solution, and we haven't guessed it already..
      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        // Push the newly guessed letter into the matchedLetters array.
        this.matchedLetters.push(letter);
      }
    }
  },

  // This function builds the display of the word that is currently being guessed.
  // For example, if we are trying to guess "blondie", it might display "bl_ndi_".
  rebuildWordView: function() {
    // We start with an empty string.
    var wordView = "";

    // Loop through the letters of the word we are trying to guess..
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      // If the current letter has been guessed, display that letter.
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
        wordView += this.lettersOfTheWord[i];
      }
      // If it hasn't been guessed, display a "_" instead.
      else {
        wordView += "&nbsp;_&nbsp;";
      }
    }

    // Update the page with the new string we built.
    document.querySelector("#current-word").innerHTML = wordView;
  },

  // Function that "restarts" the game by resetting all of the variables.
  restartGame: function() {
    document.querySelector("#guessed-letters").innerHTML = "";
    this.wordInPlay = null;
    this.lettersOfTheWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    this.setupGame();
    this.rebuildWordView();
  },

  // Function that checks to see if the user has won.
  updateWins: function() {
    var win;

    // this won't work for words with double or triple letters
    // var lettersOfTheWordClone = this.lettersOfTheWord.slice(); //clones the array
    // this.matchedLetters.sort().join('') == lettersOfTheWordClone.sort().join('')

    // If you haven't correctly guessed a letter in the word yet, we set win to false.
    if (this.matchedLetters.length === 0) {
      win = false;
    }
    // Otherwise, we set win to true.
    else {
      win = true;
    }

    // If a letter appears in the lettersOfTheWord array, but not in the matchedLetters array, set win to false.
    // In English, if you haven't yet guessed all the letters in the word, you don't win yet.
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        win = false;
      }
    }

    // If win is true...
    if (win) {

      // Increment wins.
      this.wins = this.wins + 1;

      // Update wins on the page.
      document.querySelector("#wins").innerHTML = this.wins;

      // Update the song title and band on the page.
      document.querySelector("#games").innerHTML = this.wordsToPick[this.wordInPlay].song +
      " By " + this.wordInPlay;

      // Update the image of the band on the page.
      document.querySelector("#game-div").innerHTML =
        "<img class='game-image' src='../images/" +
        this.wordsToPick[this.wordInPlay].picture + "' alt='" +
        this.wordsToPick[this.wordInPlay].song + "'>";

      // Play an audio track that is related to the character.
      var audio = new Audio(this.wordsToPick[this.wordInPlay].preview);
      audio.play();

      // return true, which will trigger the restart of our game in the updatePage function.
      return true;
    }
    // If win is false, return false to the updatePage function. The game goes on!
    return false;
  }
};

// Initialize the game when the page loads.
videoGameGuessGame.setupGame();

// When a key is pressed..
document.onkeyup = function(event) {
  // Check if the key pressed is a letter.
  if (event.keyCode >= 49 && event.keyCode <= 90) {
    // Capture pressed key and make it lowercase.
    videoGameGuessGame.letterGuessed = event.key.toLowerCase();
    // Pass the guessed letter into our updatePage function to run the game logic.
    videoGameGuessGame.updatePage(videoGameGuessGame.letterGuessed);
  }
  
};
