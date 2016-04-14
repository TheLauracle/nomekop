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

		this.maxhealth = level * 5;
		this.currenthealth = this.maxhealth;

		this.icon = new Image();
		this.icon.src = "img/catbg1.png";
	}

	drawMe(){
		context.drawImage(this.icon, 125, 20);
	}
}

//** -------------- ------------ -------------- **
//** -------------- PLAYER CLASS -------------- **
//** -------------- ------------ -------------- **
class Player extends Character {
	constructor(name){
		super(name, 1);
		this.icon.src = "img/standright.gif";
	}
}