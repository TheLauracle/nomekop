//** -------------- ------------ -------------- **
//** -------------- BUTTON CLASS -------------- **
//** -------------- ------------ -------------- **

class Button{
	constructor(x, y, width, height, name){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.xpos = this.x - (this.width / 2);
		this.name = name;
		console.log("initialized " + this.name);
	}

	wasClicked(mouseX, mouseY){
		if((mouseX >= this.xpos) && (mouseX <= (this.xpos + this.width)) && (mouseY >= this.y) && (mouseY <= (this.y + this.height)))
			return true;
		else
			return false;
	}

	drawMe(){
		context.fillStyle = "#0000ff";
		context.fillRect(this.xpos, this.y, this.width, this.height);
		context.font = "20px Arial";
		context.fillStyle = "#ffffff";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillText(this.name,this.x, this.y + (this.height / 2));
	}
}

var STANDARD_FRAME_SIZE = 40;
//** -------------- --------------- -------------- **
//** -------------- CHARACTER CLASS -------------- **
//** -------------- --------------- -------------- **
class Character {
	constructor(name, level){
		this.name = name;
		this.level = level;

		//stats
		this.maxhealth = level * 5;
		this.currenthealth = this.maxhealth;

		//info for drawing
		this.isMoving = false;
		this.x = -100;
		this.y = -100;
		this.posX = -100;
		this.posY = -100;

		//info for animation
		this.icon = new Image();
		this.icon.src = "img/catbg1.png";
	}

	drawMe(){
		context.drawImage(this.icon, x, y);
	}

	getMaxHealth(){ return this.maxhealth; }
	getCurrentHealth(){	return this.currenthealth; }
}

//** Movable Character **
//Includes animations and checking if you can move out of bounds
//*tryMove might be overridden so NPCs can walk off-screen?
//*eventually, all characters will need some variable for their icon
// so that we can't walk through them
class Movable extends Character {
	constructor(name, level, size){ //size: 1(1tile), 2(2x2), or 3(5x5)
		super(name, level);
		this.rspritesheet = new Image();
		//change later?
		this.rspritesheet.src = "img/walkrightspritesheet.png";
		this.lspritesheet = new Image();
		this.lspritesheet.src = "img/walkleftspritesheet.png";
		this.activeimage = this.icon;
		
		this.maxframes = 1;
		this.currentframe = 1;
		this.framemaxprogress = 100; //how many drawMe() calls until change frame
		this.frameprogress = 1;
		this.sx = 0;

		var framefactor = (size != 3) ? size : 5;
		this.framesize = {
			x : STANDARD_FRAME_SIZE * framefactor,
			y : STANDARD_FRAME_SIZE * framefactor
		};

		this.walkdirections = [];
		this.speedX = 1.0;
		this.speedY = 1.0;

		this.movable = true; //if false, skip move()
	}

	drawMe(){
		//move position if necessary
		for (var i=0; i<this.walkdirections.length; i++){
			this.move(this.walkdirections[i]);
		}

		//put the player at position
		context.drawImage(this.activeimage, this.sx, 0, this.framesize.x, this.framesize.y, Math.round(this.posX), Math.round(this.posY), this.framesize.x, this.framesize.y);

		//change sprite frame
		if(this.frameprogress >= this.framemaxprogress) {
			console.log("change frames for character "+this.name);
			//if on a spritesheet, change frames every time framemaxprogress is reached
			if(this.currentframe >= this.maxframes) { //determine which frame to choose
				this.currentframe = 1;
			} else {
				this.currentframe++;
			}
			this.sx = (this.currentframe - 1) * this.framesize.x; //use the frame chosen above

			this.frameprogress = 1;
		}
		this.frameprogress++;
	}

	//main move method. go in the direction depending on speed. if we can't, stop moving there.
	move(direction){
		if (!this.movable) return;

		//honestly, I don't remember what the difference is between x and posX.
		switch(direction){
			case 0: //left
				this.activeimage = this.lspritesheet;
				this.posX = this.posX - this.speedX;
				this.x = this.x - this.speedX;
				if(!this.tryMove(this.posX, this.posY)) this.stopMoving(0);
				break;
			case 1: //up
				if(this.activeimage != this.lspritesheet && this.activeimage != this.rspritesheet)
					this.activeimage = this.rspritesheet;
				this.posY = this.posY - this.speedY;
				this.y = this.y - this.speedY;
				if(!this.tryMove(this.posX, this.posY)) this.stopMoving(1);
				break;
			case 2: //right
				this.activeimage = this.rspritesheet;
				this.posX = this.posX + this.speedX;
				this.x = this.x + this.speedX;
				if(!this.tryMove(this.posX, this.posY)) this.stopMoving(2);
				break;
			case 3: //down
				if (this.activeimage != this.lspritesheet && this.activeimage != this.rspritesheet)
					this.activeimage = this.lspritesheet;
				this.posY = this.posY + this.speedY;
				this.y = this.y + this.speedY;
				if(!this.tryMove(this.posX, this.posY)) this.stopMoving(3);
				break;
			default:
				break;
		}
	}

	//(move helper) if we can't go there, go as far as we can instead AND return false
	tryMove(coordX, coordY){
		var success = true;
		
		//x-axis
		if(coordX < 0) {
			this.posX = 0;
			this.x = 0;
			success = false;
		} else if (coordX + this.framesize.x > context.canvas.width) {
			this.posX = context.canvas.width - this.framesize.x;
			this.x = this.posX;
			success = false;
		}
		//y-axis
		if(coordY < 0){
			this.posY = 0;
			this.y = 0;
			success = false;
		} else if (coordY + this.framesize.y > context.canvas.height){
			this.posY = context.canvas.height - this.framesize.y;
			this.y = this.posY;
			success = false;
		}

		return success;
	}

	//begin & stop moving: add directions to walk in during the game tick.
	beginMoving(dirnum){
		//convention: 0 = left; 1 = up; 2 = right; 3 = down
		console.log("Inner move begin");
		var adddir = this.walkdirections.indexOf(dirnum);
		if (adddir < 0) this.walkdirections.push(dirnum); //add direction if not moving
	}
	stopMoving(dirnum){
		//convention: 0 = left; 1 = up; 2 = right; 3 = down
		var removedir = this.walkdirections.indexOf(dirnum);
		if (removedir > -1) this.walkdirections.splice(removedir, 1); //remove direction if moving
	}
}

//** -------------- ------------ -------------- **
//** -------------- PLAYER CLASS -------------- **
//** -------------- ------------ -------------- **
class Player extends Movable {
	constructor(name){
		super(name, 1, 1);
		this.icon.src = "img/standright.gif";
		this.rspritesheet = new Image();
		this.rspritesheet.src = "img/walkrightspritesheet.png";
		this.lspritesheet = new Image();
		this.lspritesheet.src = "img/walkleftspritesheet.png";

		this.activeimage = this.icon;
		this.maxframes = 1;
		this.currentframe = 1;
		this.framemaxprogress = 100; //how many drawMe() calls until change frame
		this.frameprogress = 1;
		this.sx = 0;
		//this.sy = 0;

		//movement
		this.walkdirections = [];
		this.speedX = 1.0;
		this.speedY = 1.0;
		this.posX = (context.canvas.width - this.icon.width) / 2.0;
		this.posY = (context.canvas.height - this.icon.height) / 2.0;
		this.x = this.posX;
		this.y = this.posY;

		this.movable = true; //change to false for dialogue
	}

	//freeze: allow the user to move or prevent them from moving
	freeze(frozen){
		this.movable = !frozen;
	}

	//overwrite Movable's moving to handle our animation for now
	//until we standardize maxframes, it's specific to our character
	beginMoving(dirnum){
		//convention: 0 = left; 1 = up; 2 = right; 3 = down
		if (!this.movable) return;
		var adddir = this.walkdirections.indexOf(dirnum);
		if (adddir < 0) this.walkdirections.push(dirnum); //add direction if not moving
		if (this.walkdirections.length != 0) this.maxframes = 2; //start animating sprite
	}
	stopMoving(dirnum){
		//convention: 0 = left; 1 = up; 2 = right; 3 = down
		var removedir = this.walkdirections.indexOf(dirnum);
		if (removedir > -1) this.walkdirections.splice(removedir, 1); //remove direction if moving
		if (this.walkdirections.length == 0) this.maxframes = 1; //stop animating sprite
	}
}

//** -------------- ---------------- -------------- **
//** -------------- NON-PLAYER CLASS -------------- **
//** -------------- ---------------- -------------- **

//IN-PROGRESS: Non-player characters move on their own
//and look different from the player. But collisions...
class Nonplayer extends Character {
	constructor(name, iconsrc, lss, uss, rss, dss){
		super(name, 1);
		this.icon.src = iconsrc; //"img/standright.gif";
		this.rspritesheet = new Image();
		this.rspritesheet.src = rss; //"img/walkrightspritesheet.png";
		this.lspritesheet = new Image();
		this.lspritesheet.src = lss;//"img/walkleftspritesheet.png";
		this.uspritesheet = new Image();
		this.uspritesheet.src = uss;
		this.dspritesheet = new Image();
		this.dspritesheet.src = dss;

		this.activeimage = this.icon;
		this.maxframes = 1;
		this.currentframe = 1;
		this.framesize = {
			x : 40,
			y : 40
		};
		this.framemaxprogress = 100; //how many drawMe() calls until change frame
		this.frameprogress = 1;
		this.sx = 0;
		//this.sy = 0;

		//movement
		this.walkdirections = [];
		this.speedX = 1.0;
		this.speedY = 1.0;

		//iniitialize NPCs off-screen, then place them where they are needed
		this.posX = -100;// (context.canvas.width - this.icon.width) / 2.0;
		this.posY = -100;//(context.canvas.height - this.icon.height) / 2.0;
	}

}