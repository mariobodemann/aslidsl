var stage = null;

function init() {
    stage = new createjs.Stage( "canvas" );
    createjs.Ticker.addEventListener( "tick", update );
    createjs.Ticker.useRAF = true;	 
    createjs.Ticker.setFPS( 30 );
    
    var text = new createjs.Text("Hello World", "30px Sans-Serif", "#C00");
    text.x = 10;
    text.y = 10;
    stage.addChild( text );	 
   
    var image = new createjs.Bitmap("../res/technical-tileset.png");
    stage.addChild( image ); 
}

var i = 0;
function update() {
    stage.getChildAt(0).rotation = i++;
    stage.update();

    //LevelManager.update();
}



//LevelManager.loadLevel( "myLevel.json" );


//var player = new Player();

//var entityLink = LevelManager.addEntity( player.displayObject, x, y, l ); // player = { id : "object_1", layer : null, data : { displayObject: blah } };

//LevelManager.moveEntity( entityLink, offset, ignorePhysics );




//var displayObject = entityDict[entityLink.id];
//var layer = layerDict[entityLink.layerId];


//delete dict[key];

