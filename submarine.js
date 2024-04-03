//initialize
var rows = 0;
var columns = 0;
var boardDims = 5;
var arrows = document.getElementsByClassName("arrowList");
var moves = [];

//create board
createBoard(boardDims);
//var board = document.getElementsByClassName("cell");
var board = $(".cell");

//add terrain
addIce(getCellID(2,2));
addIce(getCellID(2,5));
addIce(getCellID(5,3));

//add user input
document.body.addEventListener("keydown", checkInput);
function checkInput(){
	let key = event.key.toLowerCase();
	if(key == "n" || key == "arrowup"){
		moves.push("n");
		addMove("N");
	}
	if(key == "e" || key == "arrowright"){
		moves.push("e");
		addMove("E");
	}
	if(key == "s" || key == "arrowdown"){
		moves.push("s");
		addMove("S");
	}
	if(key == "w" || key == "arrowleft"){
		moves.push("w");
		addMove("W");
	}
}
function addMove(direction){
	let text = document.getElementById("movesText");
	text.innerHTML += direction + ", ";
}
$("#delete").on("click", function(){
	console.log($("#movesText").innerHTML);
	$("#movesText").innerHTML = $("#movesText").innerHTML.substring(0, $("#movesText").innerHTML.length - 3);
});
$("#clear").on("click", function(){

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