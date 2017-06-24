window.onload = function(){

var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

var changeSize = document.getElementById("change-size");
var sizeInput = document.getElementById("size");
var scoreLabel = document.getElementById("score");

// add list how to play
scoreLabel.innerHTML = "<strong>Упралвение стрелками клавиатуры</strong><br /> ← - влево; → - вправо; ↑ - вверх; ↓ - вниз";

var score = 0;
var size = 4;
var width = canvas.width / size - 6;

var fontSize;
var cells = [];
var loss = false;

startGame();

function cell(row, line){
  this.value = 0;
  this.x = line * width + 5 * (line + 1);
  this.y = row * width + 5 * (row + 1);
};

function cleanCanvas(){
  context.clearRect(0, 0, 500, 500);
};

changeSize.onclick = function (){
  size = sizeInput.value;
  width = canvas.width / size - 6;
  cleanCanvas();
  startGame();
};

function createCells(){
  for (var i = 0; i < size; i++) {
    cells[i] = [];
    for (var j = 0; j < size; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
};

function drawCell(cell){
  context.beginPath();
  context.rect(cell.x, cell.y, width, width);

  switch (cell.value){
   case 0 : context.fillStyle = "#e0e0d1"; 
   break;
   case 2 : context.fillStyle = "#be6732"; 
   break;
   case 4 : context.fillStyle = "#ff0000"; 
   break;
   case 8 : context.fillStyle = "#ffcc00"; 
   break;
   case 16 : context.fillStyle = "#bfff00"; 
   break;
   case 32 : context.fillStyle = "#00ff00"; 
   break;
   case 64 : context.fillStyle = "#00bfff"; 
   break;
   case 128 : context.fillStyle = "#fa6105"; 
   break;
   case 256 : context.fillStyle = "#1a53ff"; 
   break;
   case 512 : context.fillStyle = "#ff0080"; 
   break;
   case 1024 : context.fillStyle = "#ff1a8c"; 
   break;
   case 2048 : context.fillStyle = "#b97dd2"; 
   break;
   case 4096 : context.fillStyle = "#d5f524"; 
   break;
   default : context.fillStyle = "#ff0080";
 }

 context.fill();

 if (cell.value){
  fontSize = width/2;
  context.font = fontSize + "px Georgia";
  context.fillStyle = 'white';
  context.textAlign = "center";
  context.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width / 7);
}
};

document.onkeydown = function (event){

  if (!loss){
    if (event.keyCode == 38 || event.keyCode == 87) moveUp();
    else if (event.keyCode == 39 || event.keyCode == 68) moveRight();
    else if (event.keyCode == 40 || event.keyCode == 83) moveDown();
    else if (event.keyCode == 37 || event.keyCode == 65) moveLeft();
   scoreLabel.innerHTML = "Очки : " + score;
  }
};

function startGame(){
  createCells();
  drawAllCells();
  pasteNewCell();
  pasteNewCell();
};

function reloadPage(){
  if(!alert('Игра окончена со счётом ' + score + '! Нажмите "Ок" чтобы начать снова.')){window.location.reload();}
};

function finishGame(){
  canvas.style.opacity = "0.5";
  loss = true;
};

function drawAllCells(){
  for (var i = 0; i < size; i++){
    for (var j = 0; j < size; j++){
      drawCell(cells[i][j]);
    }
  }
};

function pasteNewCell(){
  var countFree = 0;
  
  for (var i = 0; i < size; i++){
    for (var j = 0; j < size; j++){
      if (!cells[i][j].value){
        countFree++;
      }
    }
  };
  if (!countFree){
    finishGame();
    reloadPage();
    return;
  };


  while (true){
    var row = Math.floor(Math.random() * size);
    var line = Math.floor(Math.random() * size);
    
    if (!cells[row][line].value){
      cells[row][line].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
      return;
    }
  };
};

function moveUp(){
  for (var j = 0; j < size; j++){
    for (var i = 1; i < size; i++){
      if (cells[i][j].value){
        var row = i;
        while (row > 0){
          if (!cells[row - 1][j].value){
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value){
            cells[row - 1][j].value *= 2;
            score +=  cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          }
          else break;
        }
      }
    }
  }
  pasteNewCell();
};

function moveDown(){
  for (var j = 0; j < size; j++){
    for (var i = size - 2; i >= 0; i--){
      if (cells[i][j].value) {
        var row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value){
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value){
            cells[row + 1][j].value *= 2;
            score +=  cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          }
          else break;
        }
      }
    }
  }
  pasteNewCell();
};

function moveLeft(){
  for (var i = 0; i < size; i++){
    for (var j = 1; j < size; j++){
      if (cells[i][j].value){
        var line = j;
        while (line - 1 >= 0){
          if (!cells[i][line - 1].value){
            cells[i][line - 1].value = cells[i][line].value;
            cells[i][line].value = 0;
            line--;
          } else if (cells[i][line].value == cells[i][line - 1].value){
            cells[i][line - 1].value *= 2;
            score +=   cells[i][line - 1].value;
            cells[i][line].value = 0;
            break;
          }
          else break;
        }
      }
    }
  }
  pasteNewCell();
};

function moveRight (){
  for (var i = 0; i < size; i++){
    for (var j = size - 2; j >= 0; j--){
      if (cells[i][j].value){
        var line = j;
        while (line + 1 < size){
          if (!cells[i][line + 1].value){
            cells[i][line + 1].value = cells[i][line].value;
            cells[i][line].value = 0;
            line++;
          } else if (cells[i][line].value == cells[i][line + 1].value){
            cells[i][line + 1].value *= 2;
            score +=  cells[i][line + 1].value;
            cells[i][line].value = 0;
            break;
          }
          else break;
        }
      }
    }
  }
  pasteNewCell();
};
}