let realNumber = [];
let reached = false;
//assign number values to colors
const colors = {
  '1': 'yellow',
  '2': 'green',
  '3': 'red',
  '4': 'orange',
  '5': 'blue',
  '6': 'purple'
};
let guessCountColor = 0;
let guess = [];
let guesses = 0;
//create arrays for the results and dots
createRandomNumber();
const dots = document.getElementsByClassName('dot');
const section = document.getElementsByClassName('section');
const results = document.getElementsByClassName('identifier');
document.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    check();
  }
});
function check() {
  //check to make sure that all 4 dots have been filled
  if (reached == false) {
    return;
  } else if (reached == true) {
    reached = false;
    guessCountColor = 0;
  }
  //if reached 10 turns, game ends
  if (guesses === 9) {
    alert('Thats tough bro, you lose.');
    onWin();
    return;
  }
  let numberCorrect = 0;
  let numberWrong = 0;
  const number = [];
  const resultGuess = [];
  //duplicate random number to avoid pass-by-reference and create editable copy
  for (let i = 0; i < realNumber.length; i++) {
    number[i] = realNumber[i];
    resultGuess[i] = guess[i];
    dots[(guesses*4)+i].style.backgroundColor = colors[(guess[i])];
  }
  //check to see if any spot is in the same spot as the other
  for (let i = 0; i < realNumber.length; i++) {
    if (guess[i] === number[i]) {
      numberCorrect++;
      guess[i] = null;
      number[i] = false;
      if (numberCorrect === 4) {
        alert('You win!');
        onWin();
        return;
      }
    }
  }
  //check if any numbers are equal to the other positions
  for (let i = 0; i < realNumber.length; i++) {
    for (let y = 0; y < 4; y++) {
      if (guess[i] === number[y]) {
        guess[i] = null;
        number[y] = false;
        numberWrong++;
      }
    }
  }
  //give results
  results[guesses].innerHTML = numberCorrect + " right spot, " + numberWrong + " wrong spot.";
  guesses++;
  if (guesses === 1) {
    document.getElementById('guessCount').innerHTML = '1 guess has been made so far.';
  } else {
    document.getElementById('guessCount').innerHTML = guesses + ' guesses have been made so far.';
  }
  console.log(resultGuess + ' resulted in ' + numberCorrect + ' right and ' + numberWrong + ' wrong.');
}
//create the original number that will be checked throughout
function createRandomNumber() {
  for (let i = 0; i < 4; i++) {
    realNumber[i] = (Math.floor((Math.random()*6)+1))
  }
}
//function that activates with the press of a color
function activeColor(color)  {
  //change the corresponding dot with the selected one
  dots[guessCountColor + (4*guesses)].style.backgroundColor = colors[color];
  guess[guessCountColor] = color;
  guessCountColor++;
  //if the dot is greater than the fourth one, set it to the first
  if (guessCountColor === 4) {
    guessCountColor = 0;
    reached = true;
  }
}
function onWin() {
  //reset colors
  createRandomNumber;
  reached = false;
  guessCountColor = 0;
  guess = [];
  guesses = 0;
  document.getElementById('guessCount').innerHTML = '0 guesses has been made so far.';
  for (let i = 0; i < 40; i++) {
    dots[i].style.backgroundColor = "#bbb";
  }
  for (let i = 0; i < 10; i++) {
    results[i].innerHTML = "";
  }
}
