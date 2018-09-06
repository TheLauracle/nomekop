var tilewidth = 16;

//Get tileset
var overworld = 'img/tileset.png';

//(for later) allow user to change maps
/*
function changeMap(mapname){
	if(maplist[mapname] != null)
		currentmap = mapname;
};
*/

//******* INITIALIZE MAPS ********
//*******************************
//CANVAS WIDTH: 22 TILES
//CANVAS HEIGHT: 19 TILES

var genericamap = [
"wwwwwwwggggggggggggggg",
"wwwwwggggggggg;;gggggg",
"ww========wgggg=====gg",
"wgggggwwwwwwwwwg=====g",
"wwgwwggwwwwwwwwgww===g",
"wwwwwwwwwwwwwwwww;w==g",
";wwwwwwwwgwwggwwwwwggg",
"ww=;;;wwwwgggggwgggggg",
"w=;;;;wwggggggwwwggwwg",
"ww=;;==w==g=gggggggggg",
"wg===;====ggg=gggggggg",
"===========ggggp====gg",
"==g==========ggg====gg",
"wwgg===g====gggggw==wg",
"wwwgggg=====ggggwwwwwg",
"wgggg=gg==g=ggwwwwwwgg",
"gggg====ggg=ggggwwwwwg",
"wgg====gg===gggw;wwwgg",
"wgg=========ggg;gggggg"
];

var activemap = genericamap;

//Get tile from small map
var mapinterpret = {
	'a' : 'air',
	'g' : 'grass',
	'=' : 'grass-2',
	'#003' : 'grass-3', //numbers are for tiles I haven't decided to use
	'#004' : 'grass-lush',
	'#005' : 'grass-lush2',
	'#006' : 'tallgrass',
	'w' : 'weeds',
	'#008' : 'tallweeds',
	'#003' : 'mushroom-1',
	'#00a' : 'mushroom-2',
	'#00b' : 'mushroom-3',
	';' : 'whiteflowers',
	'p' : 'purpleflowers'
};

//Find tile on tileset
var mapXscale = {
	'air' : 0,
	'grass' : 1,
	'grass-2' : 2,
	'grass-3' : 3,
	'grass-lush' : 4,
	'grass-lush2' : 5,
	'tallgrass' : 6,
	'weeds' : 7,
	'whiteflowers' : 0,
	'purpleflowers' : 1
};
var mapYscale = {
	'air' : 0,
	'grass' : 0,
	'grass-2' : 0,
	'grass-3' : 0,
	'grass-lush' : 0,
	'grass-lush2' : 0,
	'tallgrass' : 0,
	'weeds' : 0,
	'whiteflowers' : 1,
	'purpleflowers': 1
}

//Sample map render
var overworldimage = new Image();
overworldimage.src = overworld;

function floorMapRender(ctx){
	
	ctx.imageSmoothingEnabled= false;

	for (r = 0; r < activemap.length; r++) {
		for (c = 0; c < activemap[r].length; c++) {
			var tilename = mapinterpret[activemap[r].charAt(c)];
			ctx.drawImage(overworldimage, mapXscale[tilename] * tilewidth, mapYscale[tilename] * tilewidth, tilewidth, tilewidth, c * tilewidth * 2, r * tilewidth * 2, tilewidth * 2, tilewidth * 2);
		}
	}
	

	//INCOMPLETE: change position of map depending on where the user moves
};