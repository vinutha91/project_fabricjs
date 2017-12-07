var canvasList = [], 
    mousePos = {}, 
    offset = {},
    randomNumber, 
    activeObject = {}, 
    initialCanvas;

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
        radius: 20, fill: 'yellow'
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
            activeObject  = $.extend(true, {}, this.getActiveObject());
            initialCanvas = this.lowerCanvasEl.id;
        }
    });

    $(document).on('mouseup', function(evt) {
        if(evt.target.localName === 'canvas' && initialCanvas) {
            canvasId = $(evt.target).siblings().attr('id');
            if(canvasId !== initialCanvas) {
                canvasList[parseInt(canvasId.replace('canvas', ''))].add(activeObject);
                canvasList[parseInt(canvasId.replace('canvas', ''))].renderAll();
            }
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
