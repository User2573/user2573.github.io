const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

function resizeCanvas() {
  //fit canvas to window and fix issues with canvas blur on zoom
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  const scale = window.devicePixelRatio;
  canvas.width = window.innerWidth * scale;
  canvas.height = window.innerHeight * scale;
  ctx.scale(scale, scale);
  centerX = canvas.width / 2;
  centerY = canvas.height/2;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


function cycle(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.beginPath();
  ctx.moveTo(0, 0)
  ctx.lineTo(canvas.width, canvas.height);
  ctx.stroke();
  ctx.closePath();
  
  ctx.beginPath();
  ctx.arc(canvas.width, canvas.height, 30, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
  
  requestAnimationFrame(cycle);
}
requestAnimationFrame(cycle);
