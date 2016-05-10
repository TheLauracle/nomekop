var tilewidth = 16;

//Get tileset
var overworld = 'img/tileset.png';

//Get small maps
var mapslist = {
	'generica' : 'img/map-generica.png',
	'road1' : 'img/map-road1.png'
};
var currentmap = 'generica';

//(for later) allow user to change maps
/*
function changeMap(mapname){
	if(maplist[mapname] != null)
		currentmap = mapname;
};
*/

//Get tile from small map
var mapinterpret = {
	'#000' : 'air',
	'#001' : 'grass',
	'#002' : 'grass-2',
	'#003' : 'grass-3',
	'#004' : 'grass-lush',
	'#005' : 'grass-lush2',
	'#006' : 'tallgrass',
	'#007' : 'weeds',
	'#008' : 'tallweeds',
	'#009' : 'mushroom-1',
	'#00a' : 'mushroom-2',
	'#00b' : 'mushroom-3'
};


//Find tile on tileset
var mapXscale = {
	'air' : 0,
	'grass' : 1,
	'grass-2' : 2,
	'grass-3' : 3,
	'grass-lush' : 4,
	'grass-lush2' : 5,
	'tallgrass' : 6
};
var mapYscale = {
	'air' : 0,
	'grass' : 0,
	'grass-2' : 0,
	'grass-3' : 0,
	'grass-lush' : 0,
	'grass-lush2' : 0,
	'tallgrass' : 0
}

//Optional: make each tile reference just a coy of 1
/*
function getTile(name){
	var newtile = new Image();
	newtile.src = overworld;
	//INCOMPLETE: set image to just a part of itself
	return newtile;
};
*/

//Sample map render
function mapRender(){
	var themap = mapslist[currentmap];
	//INCOMPLETE: read in themap pixel by pixel and render its tiles
	
	//INCOMPLETE: change position of map depending on where the user moves
}