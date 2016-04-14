//get the canvas area from the html
var context = document.getElementById("thegame").getContext('2d');

//set up the canvas
context.canvas.width = 700;
context.canvas.height = 600;

//what to draw and how to treat events; ideas being menu, intro, overworld
var userMode = 'menu';

var entities = [];

//** -------------- ------------- -------------- **
//** -------------- DRAWING STUFF -------------- **
//** -------------- ------------- -------------- **

//** INITIALIZE STUFF TO DRAW ** 
var titleImage = new Image();
titleImage.src = "img/nomekop.png";
var playGameButton = new Button(285, 300, 130, 40, "play game");
var optionsButton = new Button(285, 350, 130, 40, "options");

//initialize player
var thePlayer = new Player("Leafmander");
entities[0] = thePlayer;

//function to draw the background
function drawBackground(){
	switch(userMode) {
		case 'menu':
			var menugradient = context.createLinearGradient(0,0,context.canvas.width, context.canvas.height);
			menugradient.addColorStop(0, "red");
			menugradient.addColorStop(1, "white");
			context.fillStyle = menugradient;
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);

			context.drawImage(titleImage, 125, 20);
			break;
		case 'intro':
			context.fillStyle = "#c0ffee";
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		default:
			break;
	}
}

function drawMenuButtons(){
	if(userMode != 'menu')
		return;

	playGameButton.drawMe();
	optionsButton.drawMe();
}

function drawEntities(){
	for(i = 0; i < entities.length; i++)
		entities[i].drawMe();
}

//updates the canvas with its (newly moved) shapes
function redraw(){
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	drawBackground();
	if(userMode == 'menu') drawMenuButtons();
	if(userMode == 'intro') drawEntities();
}

redraw();
setInterval(redraw, 100);


//** -------------- ------------ -------------- **
//** -------------- EVENTS STUFF -------------- **
//** -------------- ------------ -------------- **

//handle when the user clicks on the canvas
context.canvas.addEventListener("click", theyClicked, false);

//decide how to handle click
function theyClicked(ev){
	console.log("clickity!");

	//convert mouse coordinates to be relative to the canvas
	var rekt = context.canvas.getBoundingClientRect();
	var mouseX = ev.clientX - rekt.left;
	var mouseY = ev.clientY - rekt.top;

	switch(userMode) {

		case 'menu':
			menuClick(ev, mouseX, mouseY);
				//alert("You clicked (" + mouseX + ", " + mouseY + ").");
			break;

		case 'intro':
			if(window.confirm("Go back to menu?"))
				userMode = 'menu';
			break;

		default:

			break;
	}
}

//user left-clicked while in menu mode
function menuClick(ev, mouseX, mouseY) {
	if(playGameButton.wasClicked(mouseX, mouseY))
	{
		userMode = 'intro';
		return true;
	} 
	else if(optionsButton.wasClicked(mouseX, mouseY)) 
	{
		//UNFINISHED: add options screen
		return true;
	} 
	else 
	{
		//user clicked the background
		return false;
	}
}
