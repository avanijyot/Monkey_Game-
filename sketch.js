//game state
PLAY = 1;
END = 0;
gameState = PLAY;

//to create the sprite objects
var monkey , monkey_running; 

var banana ,bananaImage, foodGroup;

var obstacle, obstacleImage, obstacleGroup;

var survivalTime = 0;

var ground;

var score = 0;

//to preload images and animations
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {

  //to create the canvas
    createCanvas(600,400);

  //to create the monkey
    monkey = createSprite(80,350,10,10);
    monkey.addAnimation("running",monkey_running);
    monkey.scale = 0.1;

  //to create the ground
    ground = createSprite(400, 350, 900, 10);

  //to create the food and obstacle group
    foodGroup = new Group();
    obstacleGroup = new Group();
}


function draw() { 
 
  //to give the background color
   background("white");
  
  //game state play
   if(gameState===PLAY){
     
  //to make the monkey jump 
     if(keyDown("space") && monkey.y >= 200){
       monkey.velocityY  =-13;
     }
     
  //to add gravity
     monkey.velocityY = monkey.velocityY + 0.8;
     
  //to give velocity to the ground
     ground.velocityX = -4;
     
  //to create an infinite ground
     ground.x = ground.width/2;

  //to spawn food and obstacel group 
   spawnFood();
   spawnObstacles();
     
  //to increase the survival time
   survivalTime = Math.ceil(frameCount/20);
   }
  
  //to make the monkey collide with the ground
   monkey.collide(ground);  
  
  //to display score
   stroke("black");
   textSize(20);
   fill("black");
   text("Score: "+ score, 500, 50);
  
  //to display survival time
   stroke("black");
   textSize(20);
   fill("black");
   text("Survival Time: "+ survivalTime, 100, 50);
   
  
  //to draw the objects
   drawSprites();
  }

//function spawn food
function spawnFood(){
  
  if(World.frameCount%80===0){
    banana = createSprite(600, Math.round(random(120,220)), 10, 30);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  
  if(World.frameCount%300===0){
    obstacle = createSprite(600,290,40,20);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.3;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}