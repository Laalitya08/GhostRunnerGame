//Creating variables
var tower, tower_img;
var door_img, doorsGroup;
var climber_img, climbersGroup;
var ghost, ghost_img;
var invisibleBlock, invisibleBlockGroup;
var spookySound;

//Creating variables for gameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;



function preload(){
    
    //Loading all the IMAGES & SOUNDS
    tower_img = loadImage("tower.png");
    door_img = loadImage("door.png");
    climber_img = loadImage("climber.png");
    ghost_img = loadImage("ghost-standing.png");
    spookySound = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
   
  //Creating tower
  tower = createSprite(300,300,300,300);
  tower.addImage(tower_img);
  tower.velocityY = 1;
  
  //Creating grps for doors,climbers,invisibleBlocks
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  //Creating ghost
  ghost = createSprite(300,300,50,50);
  ghost.addImage(ghost_img);
  ghost.scale = 0.3;
  
}

function draw(){
  background("black");
  
  //Gamestate = play
  if(gameState === PLAY){
          
      //Playing the sound in a loop  
      spookySound.loop();
    
      //reset tower once it's out of the boundary
      if(tower.y > 600){
        tower.y = 300;
      }
    
      spawnDoors();
      
      //Moving d ghost wid left and right arrow, making it jump with space
      if(keyDown(LEFT_ARROW)){
    
        ghost.x = ghost.x-3;

      }

      if(keyDown(RIGHT_ARROW)){

        ghost.x = ghost.x+3;

      }

      if(keyDown("space")){

        ghost.velocityY = -5;

      }
      
      //Adding gravity to ghost
      ghost.velocityY = ghost.velocityY+0.5;
    

      //Stopping d ghost if it is touching climbers grp
      if(climbersGroup.isTouching(ghost)){

        ghost.velocityY = 0;

      }
    
      //if ghost touches invisibleBlock / goes out of d boundary then game = over
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    
        ghost.destroy();
        gameState = END;
      }
    

      drawSprites();    
      
    
  }else if(gameState === END){
    
    //giving style to the text
    stroke("lightBlue");
    fill("lightBlue");
    textSize(30);
    text("GAME OVER!!",220,300);
           
  }
    
}

function spawnDoors(){
  
  if(frameCount%240 === 0){
    var door = createSprite(200,50,50,50);
    var climber = createSprite(200,100,10,10);
    invisibleBlock = createSprite(200,105);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.velocityY = 1;
    invisibleBlock.velocityY = 1;
    climber.velocityY = 1;
    door.lifetime = 600;
    climber.lifetime = 600;
    door.addImage(door_img);
    climber.addImage(climber_img);
    doorsGroup.add(door);
    invisibleBlockGroup.add(invisibleBlock);
    climbersGroup.add(climber);
    door.depth = ghost.depth;
    ghost.depth +=1;
    
  }
  
  
}