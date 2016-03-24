window.onload = function(){
	//(incomplete) set background of side advert to a random image of many
	var random = Math.random() * 20;
	console.log(random);
	document.getElementById("sidead").style.backgroundImage = "url('catbg1.png')";
	
	//set widthish of sideways text div to be the height of the window
	var div = document.getElementById('sidead');
    var height = div.clientHeight;
    console.log(height);
    document.getElementById('sideadcontent').style.width = height + 'px';

}