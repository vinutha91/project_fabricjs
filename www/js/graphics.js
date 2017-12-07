var canvasList = [];
var mousePos = {};
var offset = {};
var randomNumber;

function drawCanvas(){
  randomNumber = getRandomInt(2, 5),
  canvasContainer = document.getElementById('canvases'),
  canvasListOptions = document.getElementById('canvas-list');
  
  for (var i = 0; i < randomNumber; i++) {
    var canvasElement = document.createElement('canvas'),
        canvas;
    canvasElement.id = 'canvas'+i;
    canvasContainer.appendChild(canvasElement);

    addOption('Canvas '+i, canvasListOptions);
  }
}

function initialiseFabricJSCanvases() {
  var canvas = {};
  for (var i = 0; i < randomNumber; i++) {
    canvas = new fabric.Canvas('canvas'+i);
    canvasList.push(canvas);
  }
      // canvas.add(new fabric.Rect({ width: 50, height: 50, fill: 'red', top: 100, left: 100 }));
}

function addOption(canvasId, canvasListOptions) {
  canvasListOptions.add(new Option(canvasId, canvasId.toLowerCase().replace(/ /g,'')));
}

function draw() {
  var shape = document.forms['canvasForm']['shapes'].value,
      canvasId = document.forms['canvasForm']['canvas'].value;
      alert(shape + ' ' + canvasId);
  switch (shape) {
    case 'circle':
      drawCircle(canvasId);
      break;
    case 'rectangle':
      drawRectangle(canvasId);
      break;
    default:
      alert('please select a shape');
      break;
  }
}

function drawCircle(canvasId) {
  var circle = new fabric.Circle({
        radius: 20, fill: 'yellow', left: 50, top: 50
      }),
      canvas = canvasList[parseInt(canvasId.replace('canvas',''))];
  canvas.add(circle);
  canvas.renderAll()
}

function drawRectangle(canvasId) {
  var rect = new fabric.Rect({
    fill: 'red',
    width: 40,
    height: 20,
    left: 50,
    top: 50
  }),
  canvas = canvasList[parseInt(canvasId.replace('canvas',''))];
  canvas.add(rect);
  canvas.renderAll()
}

function addEventHandlersToCanvases() {
  var activeObject, initialCanvas;

  for (var i = 0; i < canvasList.length; i++) {
    
    observe(canvasList[i], 'object:modified');
    observe(canvasList[i], 'object:moving');
    observe(canvasList[i], 'object:scaling');
    observe(canvasList[i], 'object:rotating');
    observe(canvasList[i], 'object:skewing');
    observe(canvasList[i], 'before:selection:cleared');
    observe(canvasList[i], 'selection:cleared');
    observe(canvasList[i], 'selection:created');
    observe(canvasList[i], 'selection:updated');
    // observe(canvasList[i], 'mouse:up');
    // observe(canvasList[i], 'mouse:down');
    observe(canvasList[i], 'mouse:move');
    observe(canvasList[i], 'mouse:dblclick');
    observe(canvasList[i], 'mouse:wheel');
    observe(canvasList[i], 'mouse:over');
    observe(canvasList[i], 'mouse:out');
    observe(canvasList[i], 'after:render');

    canvasList[i].on('mouse:down', function() {
      console.log('***MOUSE DOWN'+this.lowerCanvasEl.id)
      if(this.getActiveObject()) {
            activeObject  = this.getActiveObject();
            initialCanvas = this.lowerCanvasEl.id;
        }
    });

    canvasList[i].on('mouse:up', function(e) {
      var target = event.target,
          currentCanvasId = target.parentElement.childNodes[0].id;

      console.log('***MOUSE UP'+currentCanvasId);

      if(currentCanvasId !== initialCanvas && !!activeObject) {
          canvasList[parseInt(currentCanvasId.replace('canvas', ''))].add(activeObject.canvas._objects[0]);
          canvasList[parseInt(currentCanvasId.replace('canvas', ''))].renderAll();
      }

      initialCanvas = '';
      activeObject  = {}; 
    });
  }
}

function log(message) {
    console.log(message);
}

 function observe(canvas, eventName) {
    canvas.on(eventName, function(opt){ log(eventName) });
  }

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
