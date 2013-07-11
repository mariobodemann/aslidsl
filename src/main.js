var stage = null;
var images = null;
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
    resize();

    createjs.Ticker.addEventListener( "tick", update );     
    createjs.Ticker.useRAF = true;      
    createjs.Ticker.setFPS( 30 );

    loadNextImage();
}

function loadNextImage() { 
    if( current ) {
       createjs.Tween.get(current).to({alpha:0}, 1000).call(remove,[current]);
    }    

    var imageId = Math.floor(Math.random() * images.length);
    var imagePath = encodeURI(images[imageId]);
    var image = new createjs.Bitmap(imagePath);
    
    image.image.onload = function() {
        current = new createjs.Container();
        current.addChild( image ); 
        stage.addChildAt(current,0);    

        current.alpha=0;
        
        var scale = image.image.width < image.image.height ? 
		stage.canvas.width / image.image.width : 
		stage.canvas.height / image.image.height;
	current.scaleX = scale;
	current.scaleY = scale;

        current.x = stage.canvas.width / 2 - image.image.width / 2;
        current.y = stage.canvas.height/ 2 - image.image.height / 2;
        
        createjs.Tween.get(current).to({alpha:1}, 1000);

        var effectId = Math.floor( Math.random() * (effects.length +1));

        if( effectId > 0 ) {
           createjs.Tween.get(current).to(transformEffect(effects[effectId-1]), 15000).call(loadNextImage);
        } else {
           createjs.Tween.get(current).wait(15000).call(loadNextImage);
        }
    }    
}

function transformEffect( effect ) {
    var newEffect = {};
    newEffect.x = effect.x;
    newEffect.y = effect.y;
    newEffect.scaleX = effect.scaleX;
    newEffect.scaleY = effect.scaleY;

    if( effect.x ) newEffect.x += current.x;
    if( effect.y ) newEffect.y += current.y;

    return newEffect;
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
}

