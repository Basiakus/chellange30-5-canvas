const canvasElement = document.getElementById('canvasElement');
const canvas = canvasElement.getContext('2d');
let isDrawing = false;
let drawDirection = true;
let lastOffsetY = 0;
let lastOffsetX = 0;
let hslColor = 0;

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

window.innerWidth > 800 ? canvas.font = "4em Comic Sans MS" : canvas.font = "2.5em Comic Sans MS"  ;

canvas.fillStyle = 'rgba(128,0,128 , .2)';
canvas.textAlign = "center";
canvas.fillText('Press and hold',canvasElement.width / 2, canvasElement.height / 2.4);
canvas.fillText('And',canvasElement.width / 2, canvasElement.height / 2);
canvas.fillText('Feel free',canvasElement.width / 2, canvasElement.height / 1.7);

canvas.strokeStyle = 'purple';
canvas.lineCap = "round";
canvas.lineJoin = "round";
canvas.lineWidth = 50;

function resizeCanvas() {
	canvasElement.width = window.innerWidth;
	canvasElement.height = window.innerHeight;
}

function startFromClick(e) {
	isDrawing = true;
	lastOffsetY = e.offsetY;
	lastOffsetX = e.offsetX;
}
function draw(e) {
	if(!isDrawing) return;
	console.log(hslColor);
	canvas.strokeStyle = `hsl(${hslColor}, 100%, 50%)`;
	canvas.beginPath();
	canvas.moveTo(lastOffsetX, lastOffsetY);
	canvas.lineTo(e.offsetX, e.offsetY);
	canvas.stroke();
	lastOffsetY = e.offsetY;
	lastOffsetX = e.offsetX;
	hslColor++;

	if(hslColor > 360) hslColor = 0;

	if(canvas.lineWidth >= 50 || canvas.lineWidth <= 1) {
		drawDirection = !drawDirection;
	}

	drawDirection ? canvas.lineWidth++ : canvas.lineWidth--;
	
}

canvasElement.addEventListener('mousedown', startFromClick);
canvasElement.addEventListener('mousemove', draw);
canvasElement.addEventListener('mouseout', () => isDrawing = false);
canvasElement.addEventListener('mouseup', () => isDrawing = false);

canvasElement.addEventListener('touchstart', function(e) {
	e.preventDefault();
	startFromClick(e);
});
canvasElement.addEventListener('touchmove', function(e) {
	e.preventDefault();
	draw(e);
});
canvasElement.addEventListener('touchend', () => isDrawing = false);



