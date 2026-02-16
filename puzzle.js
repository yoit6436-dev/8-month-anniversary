var rows = 3;
var columns = 3;

var currTile;
var otherTile;
var turns = 0;

var imgOrder = ["4","2","8","5","1","6","7","9","3"];

window.onload = function () {
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("img");
    tile.src = imgOrder[i] + ".jpg";
    tile.id = i;

    tile.addEventListener("dragstart", dragStart);
    tile.addEventListener("dragover", e => e.preventDefault());
    tile.addEventListener("drop", dragDrop);
    tile.addEventListener("dragend", dragEnd);

    document.getElementById("board").append(tile);
  }
};

function dragStart() {
  currTile = this;
}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {
  if (!otherTile.src.includes("9.jpg")) return;

  let currImg = currTile.src;
  currTile.src = otherTile.src;
  otherTile.src = currImg;

  turns++;
  document.getElementById("turns").innerText = turns;

  checkSolved();
}

function checkSolved() {
  let imgs = document.querySelectorAll("#board img");
  let correct = true;

  for (let i = 0; i < 9; i++) {
    if (!imgs[i].src.includes((i + 1) + ".jpg")) {
      correct = false;
      break;
    }
  }

  if (correct) {
    document.getElementById("doneText").style.display = "block";
  }
}
