var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var EggsGroup, obstacle1, egg;
var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var message;

function preload(){
  
  boy = loadImage("boy .jpeg");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("egg.png");

  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  

}

function setup() {
  createCanvas(600, 200);
  
  message = "This is a message";

  boy = createSprite(50,180,20,50);
  
  boy.addAnimation("running", trex_running);
  boy.addAnimation("collided", trex_collided);
  

  boy.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  EggsGroup = createGroup();
  cloudsGroup = createGroup();

  
  boy.setCollider("rectangle",0,0,trex.width,trex.height);
  boy.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log(message);
  
  if(gameState === PLAY){
    //move the 
    gameOver.visible = false;
    restart.visible = false;
    //change the trex animation
    
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
  
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& boy.y >= 160) {
        boy.velocityY = -12;
    }
    
    //add gravity
    boy.velocityY = boy.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnEggs();
    
    if(eggsGroup.isTouching(boy)){
        //trex.velocityY = -12;
        gameState = END;
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     //change the trex animation
      
       
      if(mousePressedOver(restart)){
        reset();
      }
     
      ground.velocityX = 0;
      boy.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    eggsGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     eggsGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  boy.collide(invisibleGround);
  
  

  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  eggsGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
}


function spawnEggs(){
 if (frameCount % 60 === 0){
   var eggsGroup = createSprite(600,165,10,40);
   egg.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,1));
    switch(rand) {
      case 1: egg.addImage(egg);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    egg.scale = 0.5;
    egg.lifetime = 300;
   
   //add each obstacle to the group
    eggsGroup.add(egg);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
 if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = boy.depth;
    boy.depth = trex.depth + 1;
    
    //add each cloud to the group
    eggsGroup.add(egg);
  }
}

