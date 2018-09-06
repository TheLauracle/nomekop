//get the canvas area from the html
var context = document.getElementById("thegame").getContext('2d');

//set up the canvas
context.canvas.width = 700;
context.canvas.height = 600;

//userMode is what to draw and how to treat events
var userMode = 'menu';

var entities = [];

//** -------------- ------------- -------------- **
//** -------------- DRAWING STUFF -------------- **
//** -------------- ------------- -------------- **

//** INITIALIZE STUFF TO DRAW ** 
var titleImage = new Image();
titleImage.src = "img/nomekop.png";
var playGameButton = new Button(context.canvas.width / 2, 300, 130, 40, "play game");
var optionsButton = new Button(context.canvas.width / 2, 350, 130, 40, "options");
var optionsdescription = new Button(context.canvas.width / 2, 40, 230, 40, "There are no options.");
var menuButton = new Button(context.canvas.width / 2, context.canvas.height / 2, 140, 40, "back to menu");

//initialize player
var player = new Player("Leafmander");
entities[0] = player;

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
		case 'ingame':
			context.fillStyle = "#000000";
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);
			break;
		case 'options':
			var optionsgradient = context.createLinearGradient(0,0,context.canvas.width, context.canvas.height);
			optionsgradient.addColorStop(0,"red");
			optionsgradient.addColorStop(1,"#daddee");
			context.fillStyle = optionsgradient;
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);
			break;
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

function drawOptions(){
	optionsdescription.drawMe();
	drawOptionsButtons();
}

function drawOptionsButtons(){
	if(userMode != 'options')
		return;

	menuButton.drawMe();
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
	if(userMode == 'options') drawOptions();
	if(userMode == 'ingame'){
		floorMapRender(context);
		drawEntities();
	}
}
redraw();
setInterval(redraw, 3);


//** -------------- ------------ -------------- **
//** -------------- EVENTS STUFF -------------- **
//** -------------- ------------ -------------- **

//handle when the user clicks on the canvas
context.canvas.addEventListener("click", theyClicked, false);
context.canvas.addEventListener("keydown", theyPressed, false);
context.canvas.addEventListener("keyup",theyReleased, false);

//decide how to handle click
function theyClicked(ev){
	console.log("user clicked the canvas");

	//convert mouse coordinates to be relative to the canvas
	var rekt = context.canvas.getBoundingClientRect();
	var mouseX = ev.clientX - rekt.left;
	var mouseY = ev.clientY - rekt.top;

	switch(userMode) {

		case 'menu':
			menuClick(ev, mouseX, mouseY);
			break;

		case 'ingame':
			ingameClick(ev, mouseX, mouseY);
			break;

		case 'options':
			optionsClick(ev, mouseX, mouseY);
			break;

		default:

			break;
	}
}

//user left-clicked while in menu mode
function menuClick(ev, mouseX, mouseY) {
	if(playGameButton.wasClicked(mouseX, mouseY))
	{
		userMode = 'ingame';
		return true;
	} 
	else if(optionsButton.wasClicked(mouseX, mouseY)) 
	{
		userMode = 'options';
		return true;
	} 
	else 
	{
		//user clicked the background
		return false;
	}
}

function ingameClick(ev, mouseX, mouseY){
	//player.move("click");
	//alert("Please use the keyboard to move! :)");
	console.log("Why did the user click? Did I do something wrong?");
}

function optionsClick(ev, mouseX, mouseY){
	if(menuButton.wasClicked(mouseX, mouseY))
	{
		userMode = 'menu';
	}
}

//handle when user presses keyboard
//TODO: replace discrete movements with "move until keyup"
function theyPressed(ev){
	console.log("user pressed the keyboard");

	if(userMode != 'ingame')
		return;

	var keykey = ev.which || ev.keyCode; //compatibility for Firefox

	switch(keykey){
		case 37: //left arrow
			player.beginMoving(0);
			player.move("left");
			break;
		case 38: //up arrow
			player.beginMoving(1);
			player.move("up");
			break;
		case 39: //right arrow
			player.beginMoving(2);
			player.move("right");
			break;
		case 40: //down arrow
			player.beginMoving(3);
			player.move("down");
			break;
		default:
			break;
	}
}
function theyReleased(ev){
	console.log("user released the key");
	if(userMode != 'ingame') return;
	var keykey = ev.which || ev.keyCode;
	switch(keykey){
		case 37: //left
			player.stopMoving(0);
		case 38: //up
			player.stopMoving(1);
		case 39: //right
			player.stopMoving(2);
		case 40: //down
			player.stopMoving(3);
		default:
			break;
	}
}