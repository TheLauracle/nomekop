//get the canvas area from the html
var context = document.getElementById("thegame").getContext('2d');

//set up the canvas
context.canvas.width = 700;
context.canvas.height = 600;



//** -------------- ------------- -------------- **
//** -------------- DRAWING STUFF -------------- **
//** -------------- ------------- -------------- **

//function to draw the background
function drawbackground(){
	var bwgradient = context.createLinearGradient(0,0,context.canvas.width, context.canvas.height);
	bwgradient.addColorStop(0, "red");
	bwgradient.addColorStop(1, "white");
	context.fillStyle = bwgradient;
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

//TBA - add menu buttons
function drawmenubuttons(){

	//"play game" button
	context.fillStyle = "#0000ff";
	context.fillRect(285, 300, 130, 40);
	context.font = "20px Arial";
	context.fillStyle = "#ffffff";
	context.fillText("play game",305,325);

}

//updates the canvas with its (newly moved) shapes
function redraw(){
	drawbackground();
	drawmenubuttons();
}

redraw();
setInterval(redraw, 100);


//** -------------- ------------ -------------- **
//** -------------- EVENTS STUFF -------------- **
//** -------------- ------------ -------------- **

//handle when the user clicks on the canvas
context.canvas.addEventListener("click", theyclicked, false);
function theyclicked(ev){
	console.log("clickity!");
	var mouseX = ev.clientX;
	var mouseY = ev.clientY;
	alert("You clicked (" + mouseX + ", " + mouseY + ").");
}
