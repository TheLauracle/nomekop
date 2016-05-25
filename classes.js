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

		this.posX = (context.canvas.width - this.icon.width) / 2;
		this.posY = (context.canvas.height - this.icon.height) / 2;
	}

	drawMe(){
		context.drawImage(this.activeimage, this.sx, 0, this.framesize.x, this.framesize.y, this.posX, this.posY, this.framesize.x, this.framesize.y);

		if(this.frameprogress >= this.framemaxprogress)
		{
			console.log("change frames");
			//if on a spritesheet, change frames every time framemaxprogress is reached
			if(this.currentframe >= this.maxframes) //determine which frame to choose
			{
				this.currentframe = 1;
			}
			else
			{
				this.currentframe++;
			}
			this.sx = (this.currentframe - 1) * this.framesize.x; //use the frame chosen above

			this.frameprogress = 1;
		}
		this.frameprogress++;
	}

	move(direction){
		//later: add canMove() and 'if' it here
		//later: add this.ismoving and change it back to false only on keyup
		this.maxframes = 2;

		switch(direction){
			case 'left':
				this.activeimage = this.lspritesheet;
				this.posX = this.posX - 5;
				this.x = this.x - 5;
				break;
			case 'up':
				if(this.activeimage != this.lspritesheet && this.activeimage != this.rspritesheet)
					this.activeimage = this.rspritesheet;
				this.posY = this.posY - 5;
				this.y = this.y - 5;
				break;
			case 'right':
				this.activeimage = this.rspritesheet;
				this.posX = this.posX + 5;
				this.x = this.x + 5;
				break;
			case 'down':
				if (this.activeimage != this.lspritesheet && this.activeimage != this.rspritesheet)
					this.activeimage = this.lspritesheet;
				this.posY = this.posY + 5;
				this.y = this.y + 5;
				break;
			default:
				break;
		}
	}
}