/*------------------Début Mouhammad------------------*/
var instance = this;
document.getElementById("ship").style.marginLeft="45%";
var alienBlockStyle=document.getElementById("alienBlock").style;
document.getElementById("alienBlock").style.marginLeft="15%";
document.getElementById("alienBlock").style.marginTop="0%";
var alienBlockWidth = document.getElementById('alienBlock').style.width;
var alienBlockWidths = parseInt(alienBlockWidth);
var leftOrRight=false;
var moveRightMax = 35;
var moveLeftMax = 0;
var moveBottomMax= 100;
var alienBlockOrigin=20;
var yMax = document.getElementById("alienBlock");
var alienBlockPositionX = parseInt(alienBlockStyle.marginLeft);
var alienBlockPositionY = parseInt(alienBlockStyle.marginTop);

document.onkeydown = function handleKeyDown(e)
{
  var key = e.keyCode;
  switch(key)
  {
    case 37:
      move('left');
      break;

    case 39:
      move('right');
      break;

    case 32:
      shot();
      break;

    case 80:
      menuPause();
      break;
  }
}

        /* Adam.E @ ACS */
function move(direction) {
  var width_window = document.body.clientWidth;
  var sizeright = document.getElementById("ship").getBoundingClientRect().marginRight;

  if (direction == "right") {
    positionLeft = document.getElementById("ship").style.marginLeft;
    num = positionLeft.substring(0,positionLeft.length-1);
    if (positionLeft == "95%") {
      return false;
    } 
    else {
      num=parseInt(num)+1;
      document.getElementById("ship").style.marginLeft = num + "%";
    }
  }
  if (direction == "left")
   {
    positionRight = document.getElementById("ship").style.marginLeft;
    num = positionRight.substring(0,positionRight.length-1);
      if (positionRight == "0%") {
        return false;
      } 
      else {
            num=parseInt(num)-1;
            document.getElementById("ship").style.marginLeft = num + "%";
        }
    }
  }

  /*------------------Début Olivier------------------*/
function movealienBlock(){
  if(alienBlockPositionX==moveLeftMax && leftOrRight==true){
    leftOrRight=false;
    
    alienBlockStyle.marginTop=parseInt(alienBlockPositionY)+5+"%";
    
    alienBlockPositionY=parseInt(alienBlockPositionY)+5;
  }
  
  else if(alienBlockPositionX<moveRightMax && leftOrRight==false){
    alienBlockStyle.marginLeft=parseInt(alienBlockPositionX)+5+"%";
    alienBlockPositionX=parseInt(alienBlockPositionX)+5;
  /*  console.log(alienBlockPositionY);
    console.log(alienBlockStyle.marginLeft);*/
  }
  
  if(alienBlockPositionX==moveRightMax && leftOrRight==false){
    leftOrRight=true;
    alienBlockStyle.marginTop=(alienBlockPositionY)+5+"%";
    alienBlockPositionY=parseInt(alienBlockPositionY)+5;
 /*   console.log(alienBlockPositionY);
    console.log(alienBlockStyle.marginLeft);*/
    
  }
  
  if(leftOrRight==true){
    alienBlockStyle.marginLeft=parseInt(alienBlockPositionX)-5+"%";
    alienBlockPositionX=parseInt(alienBlockPositionX)-5;
    /*console.log(alienBlockPositionY);
    console.log(alienBlockStyle.marginLeft);*/
  }
/*------------------Fin Olivier------------------*/

  /*if (alienBlockPositionY > 5) 
  { 
    gameOver();
    return false;
  }*/
  
};

/*------------------Pause mode Alex------------------*/

 function pause() {
    pauseMode=1
    var boxPause=document.getElementById("pause");
    var boxStage=document.getElementById("playScreen");
    boxPause.className="visible";
    boxStage.className="hidden";
 }

function resume(){
    pauseMode=0
    var boxPause=document.getElementById("pause");
    var boxStage=document.getElementById("playScreen");
    boxPause.className="hidden";
    boxStage.className="visible";
}

/*------------------Fin Alex------------------*/

function menuPause()
{
  if (handleKeyDown(key) == 80)
    pause();
  else
    resume();
}

//gameOver est le nom pour mes test. donc à modifier.
function gameOver() {
  document.getElementById("ship").style.marginLeft="45%";
  document.getElementById("alienBlock").style.marginLeft="15%";
  document.getElementById("alienBlock").style.marginTop="0%";
}

var myLivingalienBlock = setInterval(movealienBlock,2500);

function shot() {
  var elem = document.getElementById("shot");
  document.getElementById("shot").style.marginLeft = 1;
  tir = parseInt(document.getElementById("shot").style.marginLeft) + 5;

  console.log(tir);
  var cln = elem.cloneNode(true);
  document.getElementById("shipBlock").appendChild(cln);  
  var pos = 0;
  var id = setInterval(finShot , 10); 
  var ship = document.getElementById("ship");
      cln.style.marginLeft = Math.round(ship.getBoundingClientRect().left + ship.getBoundingClientRect().width / 2) - 50 +"px";
    console.log()
  function finShot() {
    if (pos == 1200) {
      clearInterval(id);
    } 
    else {
      pos++; 
      cln.style.bottom = pos + 'px';
      var alienIsAlive = getAlienAlive();
      console.log(alienAlive);
      var shotPositon = cln.getBoundingClientRect();
      for (var i in getAlienAlive) {
        console.log(i + "=>" + alienAlive[i]);
        alien = document.getElementById(i);
        alienPosition = alien.getBoundingClientRect();
        centerShot = shotPositon.left + (shotPositon.width / 2);
       
        if (shotCenter > alienPosition.left && shotCenter < alienPosition.right && shotPositon.top < alienPosition.top && shotPositon.top < alienPosition.bottom)
        {
          alien.className = "alien";
          addtoScore();
          alienAlive[i] = false;
        }
      }
    }
  }
}

function alienListAlive() {
  // LIGNE A
  var alien = document.getElementById('ligneA').children;

  for (i=0 ; i < alien.length ; i++) {
    alienAlive[alien[i].id.substring(5,7)] = true;
  }

  // LIGNE B
  alien = document.getElementById('ligneB').children;

  for (i=0 ; i < alien.length ; i++) {
    alienAlive[alien[i].id.substring(5,7)] = true;
  }

  // LIGNE C
  var alien = document.getElementById('ligneC').children;

  for (i=0 ; i < alien.length ; i++) {
    alienAlive[alien[i].id.substring(5,7)] = true;
  }

  // LIGNE D
  var alien = document.getElementById('ligneD').children;

  for (i=0 ; i < alien.length ; i++) {
    alienAlive[alien[i].id.substring(5,7)] = true;
  }
}

/*
*           getAlienAlive() return les aliens vivant
*                    - Léo G @ ACS 2016 -
 */
function getAlienAlive() {
  var result = {};
  for (var i in alienAlive) {
    if (alienAlive[i]) {
      result[i] = true;
    }
  }
  return result;
}
/*------------------Fin Mouhammad------------------*/

/* ------------- DEBUT CAYDAYTAY ------------ 
Merci de vérifier si tout est ok (on s'occupera des points plus tards ! */

/*var alien;
this.id=id;
this.position = position;   
    //The attribute isAlive help us later to see whether the alien has been destroyed  
this.isAlive = true;  
var Score=0;
var addtoScore();
var addtoScore(value);
var setAlienBlockCenter();
var startGame;

var score=0;
    function initScore(){
        score=0;
    }
    
    function getScore(){
        return score;
    }
    
    function addToScore(point){
        score=score+point;
        document.getElementById('score').innerHTML= score;
    }

function getAlienPosition(){
         
     }

function getShotPosition(){
         
     }

function score(){
  if (getAlienPosition == getShotPosition) {
      
  if (this.hit(alienA)){
   this.remove();  //fonction pour rendre les aliens invisibles  
  // Sound.play("X");    //On joue un son 
   score =parseInt(score)+10;  
  } 
   if (this.hit(alienB)){
   this.remove();   
  // Sound.play("X");    
  score =parseInt(score)+20;       
  } 
  if (this.hit(alienC)){
   this.remove();   
   //Sound.play("X");     
   score = parseInt(score)+30;        
     
  } 
  if (this.hit(alienD)){
   this.remove();   
  // Sound.play("X");   
   score =parseInt(score)+40;        
  } 
  
  else
  {
      score =parseInt(score)-20;
  }
}*/



