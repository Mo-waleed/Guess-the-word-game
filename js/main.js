const wordList = [
  {
    word: "air",
    hint: "the invisible gaseous",
  },
  {
    word: "server",
    hint: "related to computer or system",
  },
  {
    word: "idea",
    hint: "A thought or suggestion",
  },
  {
     word: "svg",
     hint: "a vector image format",
   },
   {
     word: "jpeg",
     hint: "a small image file format",
   },
   {
     word: "search",
     hint: "act to find something",
   },
   {
     word: "tesla",
     hint: "unit magnitic flux denisity",
   },
   {
     word: "crypto",
     hint: "related to cryptocurrency",
   },
   {
     word: "java",
     hint: "progamming language",
   },
   {
     word: "banana",
     hint: "yellow long curven friut",
   },
   {
     word: "png",
     hint: "type of raster image file",
   },
   {
     word: "github",
     hint: "code hosting platform",
   },
   {
     word: "silver",
     hint: "precious greyish-white metal",
   },
   {
     word: "venus",
     hint: "planet of our solar system",
   },
   {
     word: "paython",
     hint: "progamming language",
   },
   {
   word: "google",
   hint: "famous search engine",
 }
]

const inputs = document.querySelector(".inputs"),
   resetBtn = document.querySelector(".reset-btn"),
   hint = document.querySelector(".hint span"),
   guessLeft = document.querySelector(".guess-left span"),
   typingInput = document.querySelector(".typing-input"),
   wrongletters = document.querySelector(".wrong-letter span");

 let word, maxGuesses, corrects = [], incorrects = [];

function randomWord() {
  // getting random object from wordList
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)] ;
    word = ranObj.word; // getting word of random object
    maxGuesses = 8;
    corrects = []; incorrects = [];

   hint.innerText = ranObj.hint // getting hint of random object
   guessLeft.innerHTML = maxGuesses;
   wrongletters.innerText = incorrects;

   let html = '';
   for (var i = 0; i < word.length; i++) {
     html += `<input type="text" name="" value="" disabled>`;
   }
   inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
  let key = e.target.value;
   if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)) {
      console.log(key);
      if (word.includes(key)) { // if user letter found in the word
       for (var i = 0; i < word.length; i++) {
         // showing matched letter in the input value
           if (word[i] === key) {
             corrects.push(key);
             inputs.querySelectorAll("input")[i].value = key;
           }
       }
      }else {
        maxGuesses--; // decrement maxGuesses by 1
        incorrects.push(` ${key}`);
      }
      guessLeft.innerHTML = maxGuesses;
      wrongletters.innerText = incorrects;
   }
   typingInput.value = "";

  setTimeout(() => {
    if (corrects.length === word.length) { // if user found all letter
      alert(`congrats! you found the word ${word.toUpperCase()}`);
      randomWord(); // calling the random function, so the game reset
    }else if (maxGuesses < 1) {  // if user could't found all letter
      alert("Game over! you don't have remaining guesses");
      for (var i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  });
}

resetBtn.addEventListener("click",randomWord);
document.addEventListener("keydown", () => typingInput.focus());
inputs.addEventListener("click", () => typingInput.focus());
typingInput.addEventListener("input", initGame);
