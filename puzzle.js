var rows = 3;
var columns = 3;

var currTile;
var otherTile;
var turns = 0;

// 10.jpg is the blank tile
var imgOrder = ["4","2","8","5","1","6","7","9","3","10"];

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            let tile = document.createElement("img");
            tile.id = r + "-" + c;
            tile.src = imgOrder.shift() + ".jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
};

// ---------------- Drag Functions ----------------

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    // only allow swapping with blank tile (10.jpg)
    if (!otherTile.src.includes("10.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let isAdjacent =
        (r == r2 && Math.abs(c - c2) == 1) ||
        (c == c2 && Math.abs(r - r2) == 1);

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns++;
        document.getElementById("turns").innerText = turns;

        checkWin();
    }
}

// ---------------- Win Check ----------------

function checkWin() {
    let correct = true;
    let tiles = document.querySelectorAll("#board img");

    for (let i = 0; i < 9; i++) {
        if (!tiles[i].src.includes((i + 1) + ".jpg")) {
            correct = false;
            break;
        }
    }

    if (correct) {
        setTimeout(() => {
            alert("Completed 💖 See how cute we look together!");
        }, 300);
    }
}
