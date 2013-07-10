var stage = null;
var images = null;

var description = null;
var current = null;
var effects = [
    {x: 10},
    {x:-10},
    {y: 10},
    {y:-10},
    {x: 10, y: 10},
    {x: 10, y:-10},
    {x:-10, y: 10},
    {x:-10, y:-10},

    {scaleX: 0.95, scaleY:0.95, x: 10},
    {scaleX: 0.95, scaleY:0.95, x:-10},
    {scaleX: 0.95, scaleY:0.95, y: 10},
    {scaleX: 0.95, scaleY:0.95, y:-10},
    {scaleX: 0.95, scaleY:0.95, x: 10, y: 10},
    {scaleX: 0.95, scaleY:0.95, x: 10, y:-10},
    {scaleX: 0.95, scaleY:0.95, x:-10, y: 10},
    {scaleX: 0.95, scaleY:0.95, x:-10, y:-10},

    {scaleX: 1.05, scaleY:1.05, x: 10},
    {scaleX: 1.05, scaleY:1.05, x:-10},
    {scaleX: 1.05, scaleY:1.05, y: 10},
    {scaleX: 1.05, scaleY:1.05, y:-10},
    {scaleX: 1.05, scaleY:1.05, x: 10, y: 10},
    {scaleX: 1.05, scaleY:1.05, x: 10, y:-10},
    {scaleX: 1.05, scaleY:1.05, x:-10, y: 10},
    {scaleX: 1.05, scaleY:1.05, x:-10, y:-10},
]

window.addEventListener('resize', resize, false);

function init() {
    var queue = new createjs.LoadQueue(true);
    queue.addEventListener("fileload", handleComplete);
    queue.loadFile("image-list.txt");
}

function handleComplete(event) {
    images = event.result.split("\n");
    setupStage();
}

function setupStage() {
    stage = new createjs.Stage( "canvas" );

    var shape = new createjs.Shape();
    shape.graphics.beginFill("#fff").drawRect(0, 0, 2000, 30);
    shape.alpha=0.8;
    stage.addChild(shape);

    description = new createjs.Text( "", "20px Arial", "#000" );
    stage.addChild(description);
    loadNextImage();
    
    resize();

    createjs.Ticker.addEventListener( "tick", update );     
    createjs.Ticker.useRAF = true;      
    createjs.Ticker.setFPS( 30 );
}

function loadNextImage() { 
    if( current ) {
       createjs.Tween.get(current).to({alpha:0}, 1000).call(remove,[current]);
    }    

    var imageId = Math.floor(Math.random() * images.length);
    var imagePath = encodeURI(images[imageId]);
    description.text = imagePath;

    var image = new createjs.Bitmap(imagePath);
    
    current = new createjs.Container();
    current.addChild( image ); 
    stage.addChildAt(current,0);    

    current.alpha=0;
    current.x = 0;
    current.y = 0;
    createjs.Tween.get(current).to({alpha:1}, 1000);

    var effectId = Math.floor( Math.random() * (effects.length +1));
    console.log("loading image " + imagePath + " with effect " + effectId, imagePath);
    
    if( effectId > 0 ) {
       createjs.Tween.get(current).to(effects[effectId-1], 10000).call(loadNextImage);
    } else {
       createjs.Tween.get(current).wait(4000).call(loadNextImage);
    }    
}

function remove(deleteMe) {
    if(deleteMe && deleteMe.parent) {
        deleteMe.parent.removeChild( deleteMe );
    }
} 

function update() {
    stage.update();
}

function resize() { 
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;      
  
    if(current.numChildren > 0) {
        var image = current.getChildAt(0);
        image.scaleX = window.innerWidth / image.width;
        image.scaleY = window.innerHeight / image.height;
    }
}

