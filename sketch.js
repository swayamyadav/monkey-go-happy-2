
var PLAY=1;
var END=0;
var gameState=1;
var monkey1 , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime=0;
var points=0;
var background1,backgroundI;
var ground1;
var bananaGroup,obstacleGroup;
var retry ,retryimage;
var gameover,gameoverimage;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadAnimation("sprite_0.png");
  
  backgroundI = loadImage("395e5325b9ddcbdd28c3915bdf64b713.jpg")
  retryimage = loadImage("icons8-synchronize-64.png");
  gameoverimage = loadImage("gameover.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  

  
    fill("white");
    ground1= createSprite(300,580,1200,10);
   
    ground1.x =ground1.width/2
  
  
  background1 = createSprite(300,300,0,0);
  background1.addImage(backgroundI);
  background1.x = ground1.width/2
  
  
  monkey1 = createSprite(120,520,40,40);
  monkey1.addAnimation("running",monkey_running);
   monkey1.addAnimation("collided",monkey_collided);
  monkey1.scale = 0.3
  
   gameover = createSprite(300,300,10,10);
  gameover.addImage(gameoverimage);
  gameover.scale=2.6;
  gameover.visible = false;
  
   retry = createSprite(300,430,10,10);
  retry.addImage(retryimage);
  retry.scale = 0.7;
  retry.visible = false;
  
  
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  
  monkey1.setCollider("circle",0,0,80);
  
  
  monkey1.setCollider("rectangle",0,0,monkey1.width,monkey1.height);
}


function draw() {
  background("white");
  if(gameState===PLAY){
 survivaltime = survivaltime +Math.round(getFrameRate()/60)
   
    spawnobstacles()
  spawnfruits();
  
   if (background1.x < 0){
      background1.x = background1.width/2;
    }  
  
  background1.velocityX = -4
  
    if(keyDown("space")&&monkey1.y>=315){
    monkey1.velocityY = -12;
  }
    monkey1.velocityY = monkey1.velocityY+0.5;
     
        
    }
  monkey1.velocityY = monkey1.velocityY + 0.8
  monkey1.collide(ground1);
  
     
 if(obstacleGroup.isTouching(monkey1)){
  gameState = END;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
 }
  
  if(bananaGroup.isTouching(monkey1)){
    bananaGroup.destroyEach();
    points=points+1;
  }
  
  else if(gameState===END){
   gameover.visible = true;
   retry.visible = true;
   
   monkey1.velocityY=0;
   ground1.velocityX = 0;
        
    background1.velocityX=0;
   
   fill("white");
   text("SCORE: "+survivaltime,200,275);
   text("Press Reload Button to \nrestart!!",100,120);
     text("POINTS: "+points,80,275);
   
   obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);              monkey1.changeAnimation("collided",monkey_collided);
   
   obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
 }
  
  if(mousePressedOver(retry)){
    reset();


  }
  
  
  drawSprites();
   stroke("black");
  textSize(20);
  fill("white");
  text("survivaltime :"+survivaltime,250,50);
  text("POINTS: "+points,10,20);
}

function spawnobstacles(){
  if(World.frameCount%300===0){
  obstacle = createSprite(650,510,5,5);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.3
  obstacle.velocityX= -4
  obstacleGroup.add(obstacle);
  } 
  
} 

function spawnfruits(){
  if(World.frameCount%320===0){
  banana = createSprite(650,210,0,0);
  banana.addImage(bananaImage);
  banana.scale = 0.1
  banana.velocityX= -4
  bananaGroup.add(banana);  
  }

}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  retry.visible = false;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  monkey1.changeAnimation("running",monkey_running);
  
  survivaltime = 0;
  
}

