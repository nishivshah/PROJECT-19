var score;
var highscore;
var ghost, ghostImg;
var towerImg, tower;
var gameState = "start"
var doorImg, door, doorsGroup;
var invisiblewall, invisiblewall2;
var climberImg, climber, climbersGroup;
var invisibleBlockGroup, invisibleBlock;
var diamondsimg, diamonds;
var swordimg, sword;

function preload(){
  
  doorImg = loadImage("door.png");
  towerImg = loadImage("tower.png");
  spookySound = loadSound("spooky.wav");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  diamondsimg = loadImage("diamonds.png");
  swordimg = loadImage("sword.png");
}


function setup() {

  createCanvas(600, 600);
  score = 0;
  highscore = 0;
  diamond = 0
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(250,250,20,20);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.2;
  doorGroup = new Group()
  diamondgrp = new Group()
  swordgrp = new Group()
  climberGroup = new Group()
  invisibleCGrp = new Group()
  edges = createEdgeSprites()
  invisiblewall = createSprite(80,190,10,400);
  invisiblewall.visible = false;
  invisiblewall.debug = true;
  invisiblewall2 = createSprite(560,190,10,400);
  invisiblewall2.visible = false;
  invisiblewall2.debug = true;
  alert("PLEASE READ THE INTRUCTIONS. Don't let the ghost touch its head on any climbers OR let it drop to the ground OR touch the swordto keep the game going. The ghost can rest on the doors. Collect diamonds. When you have collected enough diamonds, you can automatically resume the game if it ends. Press space to make the ghost jump and press left and right arrow keys to move it to left and right positions respectively. Best of luck!");

}


function draw() {

  background(10);
  
  

  if (gameState == "start"){
    stroke("black");
    fill("white");
    textSize(25);
    text("PRESS ENTER TO START THE GAME",70,200)
    
    if (keyDown("enter")){
      gameState = "play"
    }
  }

  if (gameState == "play"){

    if(tower.y > 400){
      tower.y = 300
    }
    if (keyDown("space")){
      ghost.velocityY = -10
      console.log("hello")
    }
    if (keyDown("left_arrow")){
      ghost.x = ghost.x - 5
    }
    if (keyDown("right_arrow")){
      ghost.x = ghost.x + 5
    }
    if (ghost.bounceOff(invisiblewall2)){
      console.log("BOUNCE");
    }
  score = score + Math.round(getFrameRate()/50);
  
  //highscore = score;
  ghost.bounceOff(edges[0]);
  ghost.bounceOff(edges[1]);
  //ghost.collide(edges[3]);
  ghost.bounceOff(invisiblewall);
  ghost.bounceOff(invisiblewall2);

  ghost.velocityY = ghost.velocityY + 0.8
  spawnDoors();
  spawnDiamonds();
  spawnsword(

  )
  if (diamondgrp.isTouching(ghost)){
    diamondgrp.destroyEach();
    diamond = diamond + 5;
  }
  
  if (swordgrp.isTouching(ghost)){
    swordgrp.destroyEach();
    gameState = "end"
  }

  if (ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
  }

  if (ghost.y > 600 || swordgrp.isTouching(ghost) || ghost.isTouching(invisibleCGrp) ){
    gameState = "end"
    diamond = 0;
    if(score > highscore){
      highscore = score;
    }
  }
  
  if (gameState == "end" && diamond > 30){
    resumegame()
  }

  drawSprites()
  stroke("black");
  fill("yellow");
  textSize(25);
  text("HIGH SCORE: "+ highscore, 350,150);
  text("SCORE: "+ score,60,150);
  text("DIAMOND: "+ diamond,60,50);
  }
  
  if (gameState == "end"){
    
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER", 200,300);
    stroke("black")
    fill("white")
    text("Thank You For Playing", 150,230)
    stroke("black")
    fill("red")
    text("PRESS BACKSPACE TO RESTART", 80,400)
    
    if (keyDown("backspace")){
    newgame();
    console.log(gameState)
   }
  }

  function spawnsword(){
    if (frameCount%300 == 0){
      sword = createSprite(random(90,450),0)
      sword.scale = 0.07; 
      sword.velocityY = 1
      sword.addImage("sword", swordimg)
      swordgrp.add(sword)
      ghost.depth = sword.depth + 1;
      sword.lifetime = 600
  
  }
  }

function spawnDiamonds(){
  if (frameCount%200 == 0){
    diamonds = createSprite(random(200,300),0)
    diamonds.scale = 0.02; 
    diamonds.velocityY = 1
    diamonds.addImage("diamond", diamondsimg)
    diamondgrp.add(diamonds)
    ghost.depth = diamonds.depth + 1;
    diamonds.lifetime = 600

}
}
function spawnDoors(){
  
  if (frameCount%200 == 0){
    door = createSprite(random(100,500),0)
    door.velocityY = 1
    door.addImage("door", doorImg)
    doorGroup.add(door)
    ghost.depth = door.depth + 1;
    door.lifetime = 600
    climber = createSprite(door.x, door.y+60)
    climber.velocityY = 1
    climber.addImage("climber", climberImg)
    climberGroup.add(climber)
    ghost.depth = climber.depth + 1;
    climber.lifetime = 600
    //climber.debug = true;
    invisibleclimber = createSprite(door.x, door.y+75,door.width,5)
    invisibleclimber.velocityY = 1
    invisibleCGrp.add(invisibleclimber)
    invisibleclimber.lifetime = 600
    invisibleclimber.visibile = false;
    }
  }
 
   function newgame(){
    if (score > highscore){
      highscore = score
    }
    score = 0
    diamond = 0
    doorGroup.destroyEach()
    climberGroup.destroyEach()
    invisibleCGrp.destroyEach()
    diamondgrp.destroyEach()
    swordgrp.destroyEach()
    gameState = "play";
    ghost.x = 250;
    ghost.y = 250;
  }
}

function resumegame(){
  diamond = 0
  doorGroup.destroyEach()
  climberGroup.destroyEach()
  invisibleCGrp.destroyEach()
  diamondgrp.destroyEach()
  swordgrp.destroyEach()
  gameState = "play";
  ghost.x = 250;
  ghost.y = 250;
}
