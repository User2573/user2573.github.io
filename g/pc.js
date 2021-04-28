const get = document.getElementById.bind(document);
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const input = document.getElementById("in");

var hw, hh, cw, ch;

function init() {
  //fit canvas to window and fix issues with canvas blur on zoom
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  const scale = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * scale;
  canvas.height = window.innerHeight * scale;
  ctx.scale(scale, scale);
  cw = window.innerWidth;
  ch = window.innerHeight;
  hw = cw / 2;
  hh = ch / 2;
}
window.onload = init;
window.onresize = init;

/* colors */
const blueTank = "#00b0e1";
const blueTankStroke = "#0083a8";
const redTank = "#f04f54";
const redTankStroke = "#b33b3f";
const greenTank = "#00e06c";
const greenTankStroke = "#00a851";
const purpleTank = "#be7ff5";
const purpleTankStroke = "#8f5fb7";
const square = "#ffe46b";
const squareStroke = "#bfae4e"
const summoned = "#fcc276";
const summonedStroke = "#bd9158";
const triangle = "#fc7676";
const triangleStroke = "#bd585a";
const pentagon = "#768cfc";
const pentagonStroke = "#5869bd";
const greenPoly = "#8aff69";
const greenPolyStroke = "#6cbe55";
/* guardian boss is crasher */
const crasher = "#f177dd";
const crasherStroke = "#b459a5";
const summoner = "#ffea5e";
/* summoner stroke is square stroke */
/* defender is triangle */
const fallen = "#c0c0c0";
const fallenStroke = "#969696";

const ffaTop = "#8effb";
const ffaBottom = "#72cdca";
const survivalTop = "#b4ff8e";
const survivalBottom = "#91cd72";
const t2Top = "#ff8e8e";
const t2Bottom = "#cd7272";
const t4Top = "	#ffeb8e";
const t4Bottom = "#cdbd72";
const domTop = "#8eb2ff";
const domBottom = "#728fcd";
const tagTop = "#b58eff";
const tagBottom = "#9272cd";
const mazeTop = "#fb8eff";
const mazeBottom = "#ca72cd";
const sbTop = "#fdcdac";
const sbBottom = "#cca58a";

const healthRegen = "e8b18a";
const maxHealth = "#e666ea";
const bodyDmg = "#9566ea";
const bulletSpeed = "#6690ea";
const bulletPen = "#e7d063";
const bulletDmg = "#ea6666";
const reload = "#92ea66";
const mvtSpeed = "#66eae6";

const levelBarGreen = "#86c280";
const levelBarGray = "#525252";
const barrel = "#999999";
const barrelStroke = "#727272";


/* player data */
var player = {
  pos: {
    x: 0,
    y: 0,
    lookX: undefined,
    lookY: undefined,
    joystX: undefined,
    joystY: undefined,
    angle: -0.8
  },
  name: "Tí • Bó",
  score: 0,
  color: {
    body: blueTank,
    stroke: blueTankStroke
  },
};


canvas.addEventListener("touchstart", (e)=>{
  player.pos.joystX = e.touches[0].clientX;
  player.pos.joystY = e.touches[0].clientY;
  player.pos.lookX = e.touches[0].clientX;
  player.pos.lookY = e.touches[0].clientY;
});

canvas.addEventListener("touchmove", (e)=>{
    player.pos.lookX = e.touches[0].clientX;
    player.pos.lookY = e.touches[0].clientY;
    
    player.pos.angle = Math.atan2(player.pos.lookY - player.pos.joystY, player.pos.lookX - player.pos.joystX);
    
    var x = Math.round(player.pos.lookX);
    var y = Math.round(player.pos.lookY);
    var cx = Math.round(player.pos.joystX);
    var cy = Math.round(player.pos.joystY)  ;
    if (!((x - cx) * (x - cx) + (y - cy) * (y - cy) <= 85*85)) {
      player.pos.lookX = Math.cos(player.pos.angle)*85+player.pos.joystX;
      player.pos.lookY = Math.sin(player.pos.angle)*85+player.pos.joystY;
    }
});
canvas.addEventListener("touchend", ()=>{
  player.pos.joystX = undefined;
  player.pos.joystY = undefined;
  player.pos.lookX = undefined;
  player.pos.lookY = undefined;
});

input.addEventListener("input", () => { player.name = input.value });

function drawBackground() {
  ctx.fillStyle = "#cdcdcd";
  ctx.fillRect(0, 0, cw, ch);
  
  
  /*ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#000";
  // TOD: BACKGROUND GRID*/
}

function drawBody() {
  ctx.fillStyle = player.color.body;
  ctx.strokeStyle = player.color.stroke;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(hw, hh, 35, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function drawBarrelsBasic() {
  ctx.beginPath();
  ctx.fillStyle = barrel;
  ctx.strokeStyle = barrelStroke;
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  
  ctx.translate(hw, hh);
  ctx.rotate(player.pos.angle);
  
  ctx.rect(0, -15, 70, 30);
  ctx.fill();
  ctx.stroke();
  
  ctx.rotate(-player.pos.angle);
  ctx.translate(-hw, -hh);
  ctx.closePath();
}

function drawName() {
  ctx.font = "1.5em Ubuntu";
  ctx.textAlign = "center";
  ctx.strokeStyle = "#545454";
  ctx.lineWidth = 6;
  ctx.fillStyle = "#ffffff";
  if (input.value == "") {
    player.name = "Tí • Bó";
  }
  ctx.beginPath();
  ctx.strokeText(player.name, hw, hh - 75);
  ctx.fillText(player.name, hw, hh - 75);
  ctx.closePath();
}

function drawScore() {
  ctx.font = "0.75em Ubuntu";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.strokeText(player.score, hw, hh - 55);
  ctx.fillText(player.score, hw, hh - 55);
  ctx.closePath();
}

function drawJoystick() {

  ctx.beginPath();
  ctx.fillStyle = "#0004";
  ctx.arc(player.pos.joystX, player.pos.joystY, 85, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  
  ctx.beginPath();
  ctx.fillStyle = "#0008";
  ctx.arc(player.pos.lookX, player.pos.lookY, 30, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

function frames() {
  requestAnimationFrame(frames);
  
  ctx.clearRect(0, 0, hw, hh);
  drawBackground();
  drawBarrelsBasic();
  drawBody();
  drawName();
  drawScore();
  drawJoystick();
}
requestAnimationFrame(frames);

//////////////////
//color changing//
//////////////////

document.getElementById("blue").addEventListener("click", () => {
  player.color.body = blueTank;
  player.color.stroke = blueTankStroke;
});
document.getElementById("red").addEventListener("click", () => {
  player.color.body = redTank;
  player.color.stroke = redTankStroke;
});
document.getElementById("green").addEventListener("click", () => {
  player.color.body = greenTank;
  player.color.stroke = greenTankStroke;
});
document.getElementById("purple").addEventListener("click", () => {
  player.color.body = purpleTank;
  player.color.stroke = purpleTankStroke;
});

// Rainbow tank
document.getElementById("hmm").addEventListener("click", () => {
  const scale = chroma.scale([blueTank, pentagon, purpleTank, crasher, redTank, summoned, square, greenTank, blueTank]).colors(2500);
  const strokeScale = chroma.scale([blueTankStroke, pentagonStroke, purpleTankStroke, crasherStroke, redTankStroke, summonedStroke, squareStroke, greenTankStroke, blueTankStroke]).colors(2500);
  let i = 0;
    setInterval(() => {
      i += 1;
      if (i > scale.length) {
          i = 0;
      }
      
      player.color.body = scale[i];
      player.color.stroke = strokeScale[i];
    });
});