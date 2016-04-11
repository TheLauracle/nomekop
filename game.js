//get the canvas area from the html
var context = document.getElementById("thegame").getContext('2d');

//set up the canvas
context.canvas.width = 700;
context.canvas.height = 600;

//what to draw and how to treat events; ideas being menu, intro, overworld
var userMode = 'menu';


//** -------------- ------------- -------------- **
//** -------------- DRAWING STUFF -------------- **
//** -------------- ------------- -------------- **

//function to draw the background
function drawBackground(){
	switch(userMode) {
		case 'menu':
			var menugradient = context.createLinearGradient(0,0,context.canvas.width, context.canvas.height);
			menugradient.addColorStop(0, "red");
			menugradient.addColorStop(1, "white");
			context.fillStyle = menugradient;
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);
			break;
		case 'intro':
			context.fillStyle = "#c0ffee";
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		default:
			break;
	}
}

//TBA - add menu buttons
function drawMenuButtons(){
	if(userMode != 'menu')
		return;
	//"play game" button
	context.fillStyle = "#0000ff";
	context.fillRect(285, 300, 130, 40);
	context.font = "20px Arial";
	context.fillStyle = "#ffffff";
	context.fillText("play game",305,325);

}

//updates the canvas with its (newly moved) shapes
function redraw(){
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	drawBackground();
	if(userMode == 'menu') drawMenuButtons();

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
			if(!menuClick(ev, mouseX, mouseY))
				alert("You clicked (" + mouseX + ", " + mouseY + ").");
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
	if((mouseX > 285) && (mouseY > 300) && (mouseX < 415) && (mouseY < 340))
	{
		//user clicked the 'play game' button
		alert("You clicked the play game button!");
		userMode = 'intro';
		return true;
	} else {
		//user clicked the background
		return false;
	}
}
