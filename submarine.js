//initialize
var rows = 0;
var columns = 0;
var boardDims = 5;
var arrows = document.getElementsByClassName("arrowList");
var moves = [];
var possiblePositions = []

//create board
createBoard(boardDims);
//var board = document.getElementsByClassName("cell");
var board = $(".cell");

//add terrain
addIce(getCellID(2,2));
addIce(getCellID(2,5));
addIce(getCellID(5,3));
checkPositions();

//add user input
document.body.addEventListener("keydown", checkInput);
function checkInput(){
	let key = event.key.toLowerCase();
	if(key == "n" || key == "arrowup"){
		moves.push("n");
		addMove("N");
		checkMove("n");
	}
	if(key == "e" || key == "arrowright"){
		moves.push("e");
		addMove("E");
		checkMove("e");
	}
	if(key == "s" || key == "arrowdown"){
		moves.push("s");
		addMove("S");
		checkMove("s");
	}
	if(key == "w" || key == "arrowleft"){
		moves.push("w");
		addMove("W");
		checkMove("w");
	}
}
function addMove(direction){
	let text = document.getElementById("movesText");
	text.innerHTML += direction + ", ";
}
$("#delete").on("click", function(){
	let movesText = $("#movesText").text();
	if(movesText.length > 13){
		$("#movesText").text(movesText.substring(0, movesText.length - 3));
	}
});
$("#clear").on("click", function(){
	$("#movesText").text("Enemy Moves: ");
});
function addIce(pos){
	board[pos].classList.add("ice");
}
function getCellID(row, column){
	//parameters treat arrays as if they started at 1
	let previousRows = boardDims * (row - 1);
	return previousRows + column - 1;
}
function createBoard(dimensions){
	rows = dimensions;
	columns = dimensions;
	let boardEl = document.createElement("div");
	boardEl.classList.add("board");
	document.body.appendChild(boardEl);
	for(let i = 0; i < dimensions; i++){
		createRow(boardEl, dimensions);

	}
	for(let i = 0; i < 25; i++){
		possiblePositions.push(i);
	}
}
function createRow(parent, length){
	let rowEl = document.createElement("div");
	rowEl.classList.add("row");
	parent.appendChild(rowEl);
	for(let i = 0; i < length; i++){
		let el = document.createElement("div");
		el.classList.add("cell");
		rowEl.appendChild(el);
	}
}

//calculations
function checkPositions(){
	for (var i = 0; i < possiblePositions.length; i++) {
		if($(".cell")[possiblePositions[i]].classList.contains("ice")){
			possiblePositions.splice(i, 1); //removes index with ice
			i--;
		}
		else{
			$(".cell")[possiblePositions[i]].classList.add("target");
		}
	}
}
function checkMove(direction){
	let modifier = 0;
	if(direction == "e"){modifier = 1}
	if(direction == "w"){modifier = -1}
	if(direction == "s"){modifier = boardDims}
	if(direction == "n"){modifier = -boardDims}

	console.log("Modifier: " + modifier);
	for(var i = 0; i < possiblePositions.length; i++){
		$(".cell")[possiblePositions[i]].classList.remove("target");
		possiblePositions[i] += modifier;
		if(possiblePositions[i] >= boardDims*boardDims){
			console.log(possiblePositions[i] + " deleted due to condition 1");
			possiblePositions.splice(i, 1);
			i--;
		}
		else if(possiblePositions[i] < 0){
			console.log(possiblePositions[i] + " deleted due to condition 2");
			possiblePositions.splice(i, 1);
			i--;
		}
		else if(Math.floor(possiblePositions[i] / boardDims) != Math.floor((possiblePositions[i] - modifier) / boardDims)){
			console.log(possiblePositions[i] + "/" + boardDims + " = " + Math.floor(possiblePositions[i] / boardDims) + ", not " + Math.floor((possiblePositions[i] - modifier) / boardDims));
			possiblePositions.splice(i, 1);
			i--;
		}
		else if($(".cell")[possiblePositions[i]].classList.contains("ice")){
			possiblePositions.splice(i, 1);
			i--;
		}
		else{
			console.log(possiblePositions[i] + " is good");
			$(".cell")[possiblePositions[i]].classList.add("target");
		}
	};
	//left and right: column change %boardDims !=
}