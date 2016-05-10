//** -------------- ------------ -------------- **
//** -------------- BUTTON CLASS -------------- **
//** -------------- ------------ -------------- **

class Button{
	constructor(x, y, width, height, name){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.name = name;
		console.log("initialized " + this.name);
	}

	wasClicked(mouseX, mouseY){
		if((mouseX >= this.x) && (mouseX <= (this.x + this.width)) && (mouseY >= this.y) && (mouseY <= (this.y + this.height)))
			return true;
		else
			return false;
	}

	drawMe(){
		context.fillStyle = "#0000ff";
		context.fillRect(this.x, this.y, this.width, this.height);
		context.font = "20px Arial";
		context.fillStyle = "#ffffff";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillText(this.name,this.x + (this.width / 2), this.y + (this.height / 2));
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
		this.sx = 0;

	}

	drawMe(){
		//center the image
		var posX = (context.canvas.width - this.icon.width) / 2;
		var posY = (context.canvas.height - this.icon.height) / 2;

		context.drawImage(this.activeimage, this.sx, 0, this.framesize.x, this.framesize.y, posX, posY, this.framesize.x, this.framesize.y);

		//if on a spritesheet, change frames every method call
		if(this.currentframe >= this.maxframes) 
		{
			this.currentframe = 1;
		}
		else
		{
			this.currentframe++;
		}

		this.sx = (this.currentframe - 1) * this.framesize.x;
	}

	move(){
		//later: add canMove() and 'if' it here
		//later: determine which direction movement is in

		//move right
		this.activeimage = this.rspritesheet;
		this.maxframes = 2;
	}
}