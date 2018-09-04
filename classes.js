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
		this.x = 0;
		this.y = 0;

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

//** -------------- ------------ -------------- **
//** -------------- PLAYER CLASS -------------- **
//** -------------- ------------ -------------- **
class Player extends Character {
	constructor(name){
		super(name, 1);
		this.icon.src = "img/standright.gif";
		this.rspritesheet = new Image();
		this.rspritesheet.src = "img/walkrightspritesheet.png";
		this.lspritesheet = new Image();
		this.lspritesheet.src = "img/walkleftspritesheet.png";

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
		this.posX = (context.canvas.width - this.icon.width) / 2.0;
		this.posY = (context.canvas.height - this.icon.height) / 2.0;
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
			console.log("change frames");
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


	move(direction){
		//later: add canMove() and 'if' it here

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
	//also start or stop animating depending on whether we're walking.
	beginMoving(dirnum){
		//convention: 0 = left; 1 = up; 2 = right; 3 = down
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