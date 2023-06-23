// board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

//pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512; // width to height ratio = 384/3072 = 1/8
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//game physics
let velocityX = -1; //pipes moving towards left

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  // draw the bird
  //   context.fillStyle = "green";
  //   context.fillRect(bird.x, bird.y, bird.width, bird.height);

  //load image
  birdImg = new Image();
  birdImg.src = "./flappybird.png";
  birdImg.onload = function () {
    // function to load the image of bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";

  requestAnimationFrame(update);
  setInterval(placePipes, 1500); // every 1.5s
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height); //to clear the previous frame after we draw the next frame

  //bird
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  //pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
  }
}

function placePipes() {
  // (0-1)*pipeHeight/2
  //0 -> -128
  //1 -> -128 -256 = -3/4 pipeHeight
  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openingSpace = board.height / 4;
  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passes: false, // to check if bird has passed the pipe
  };

  pipeArray.push(topPipe);

  let bottompipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width : pipeWidth,
    height : pipeHeight,
    passed: false
  };

  pipeArray.push(bottompipe)
}
