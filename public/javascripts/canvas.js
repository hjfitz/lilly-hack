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

//define the vars first as a failsafe. then pulll from the database and change

function drawMan(hairCol,skinCol,eyeCol,teeCol,trouserCol,shoeCol) {
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
}

var
  hairinput = document.getElementById("hair_color"),
  eyeinput  = document.getElementById("eye_color"),
  skinput   = document.getElementById('skin_color'),
  teeinput  = document.getElementById('tee_color'),
  trouinput = document.getElementById('trouser_color'),
  shoeinput = document.getElementById("shoe_color")
;

//$(hairinput).on('input',null,null,changeHair);

//hairinput.addEventListener('oninput', changeHair);
//eyeinput.addEventListener('input',  changeEye);
//skinput.addEventListener('input',   changeSkin);
//teeinput.addEventListener('input',  changeTee);
//trouinput.addEventListener('input', changeTrou);
//shoeinput.addEventListener('input', changeShoe);

var
  changeBtn = document.getElementById("btnChange"),
  checkBtn = document.getElementById("btnCheck")
;

changeBtn.addEventListener("click", changeMan);
//checkBtn.addEventListener("click", changeMan);

function changeMan(e) {
  console.log("change invoked");
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  hairCol = "#" + document.getElementById("hair_color").value;
  eyeCol  = "#" + document.getElementById("eye_color").value;
  skinCol   = "#" + document.getElementById('skin_color').value;
  teeCol  = "#" + document.getElementById('tee_color').value;
  trouserCol = "#" + document.getElementById('trouser_color').value;
  shoeCol = "#" + document.getElementById("shoe_color").value;
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
  pushDB(hairCol,eyeCol,skinCol,teeCol,trouserCol,shoeCol);
}

function pushDB(hair,eye,skin,tee,trou,shoe) {
  //post request to push to db and we're sorted for this one!
  //TODO: need to pull user preferences from database on page load. should edit /router/index.js
  //for (var i in localStorage) {
    //console.log(i);
    //console.log(localStorage[i]);
  //}
  console.log(localStorage.userid);
  $.post('/create/update',
    {
      userId: localStorage.userid,
      hairCol: hair,
      eyeCol: eye,
      skinCol: skin,
      teeCol: tee,
      trouCol: trou,
      shoeCol: shoe
    });

}

$(document).ready(function() {
  var
    skinCol    = "#FFCDD2",
    hairCol    = "#8D6E63",
    teeCol     = "#B3E5FC",
    trouserCol = "#616161",
    eyeCol     = "#8D6E63",
    shoeCol    = "#212121"
  ;
  if (localStorage.userid) {
    $.post('/create/getinfo',
      {
        userId: localStorage.userid
      },
    function(data) {
      if (data) {
        console.log(data[0]);
        data = data[0];
        skinCol    = data.skincol;
        hairCol    = data.haircol
        teeCol     = data.teecol;
        trouserCol = data.trousercol;
        eyeCol     = data.eyecol;
        shoeCol    = data.shoecol;
        console.log(data.shoecol);
        drawMan(hairCol,skinCol,eyeCol,teeCol,trouserCol,shoeCol);
      } else {
        drawMan(hairCol,skinCol,eyeCol,teeCol,trouserCol,shoeCol);
      }
    });
  }
});
