var randomNumber;

function drawCanvas(){
  randomNumber = getRandomInt(2, 5),
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
