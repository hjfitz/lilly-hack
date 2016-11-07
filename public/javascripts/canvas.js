//console.log("canvas working");

//draw a person with polygons. eventually allow a user to customize the colors (keep unisex?)

var context = document.getElementById("canvas");
var ctx = context.getContext("2d");

function drawCircle(x,y,rad,fill,strk) {
  ctx.fillStyle = fill;
  ctx.strokeStyle = strk;
  ctx.beginPath();
  ctx.arc(x,y,rad,0,Math.PI*2,true);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function drawRect(x,y,w,h,color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.fillRect(x,y,w,h);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function drawSkin(col) {
  //give him/her a neck
  drawRect(140,115,20,20,col);
  //draw a pretty face
  drawCircle(150,100,30,col,col);
}

function drawEyes(col) {
  drawCircle(140,100,5,"#fff","#fff");
  drawCircle(160,100,5,"#fff","#fff");
  //can possibly move this up and down for mood?
  drawCircle(160,102,2,col,col);
  drawCircle(140,102,2,col,col);
}

function drawTrousers(col) {
  drawRect(110,265,30,100,col);
  drawRect(160,265,30,100,col);
}

function drawShoes(col) {
  drawRect(140,365,-55,15,col);
  drawRect(160,365,55,15,col);
}

function armLeft(ctx,col) {
  ctx.beginPath();
  ctx.fillStyle = col;
  ctx.moveTo(110,135);
  ctx.lineTo(110,165);
  ctx.lineTo(90,235);
  ctx.lineTo(85,205);
  ctx.lineTo(110,135);
  ctx.fill();
  ctx.closePath();
}

function armRight(ctx,col) {
  ctx.beginPath();
  ctx.fillStyle = col;
  ctx.moveTo(190,135);
  ctx.lineTo(190,165);
  ctx.lineTo(210,235);
  ctx.lineTo(215,205);
  ctx.lineTo(190,135);
  ctx.fill();
  ctx.closePath();
}

function drawArms(ctx,col) {
  armLeft(ctx,col);
  armRight(ctx,col);
}

//use material design colours to make the person look like they fit!
//https://material.google.com/style/color.html#color-color-palette
var
  skinCol    = "#FFCDD2",
  hairCol    = "#8D6E63",
  teeCol     = "#B3E5FC",
  trouserCol = "#616161",
  eyeCol     = "#8D6E63",
  shoeCol    = "#212121"
;
//we begin with the hair
drawRect(120,60,60,40, hairCol);
//give the person a face and a neck
drawSkin(skinCol);
//they can't see!
drawEyes(eyeCol);
//draw body
drawRect(110,135,80,130,teeCol);
//draw trousers
drawTrousers(trouserCol);
//draw arms
drawArms(ctx,teeCol);
//draw shoes
drawShoes(shoeCol);
