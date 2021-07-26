var ship, shipImage;
var space, spaceImage;
var star, starImage, starGroup;
var rock, rockImage, rockGroup;
var gamestate = "play";
var score = 0;
var starsound;
var gameover;


function preload() {
  shipImage = loadImage("rocket-sprite.png");
  spaceImage = loadImage("space.png");
  starImage = loadImage("star.png");
  rockImage = loadImage("rock.png");
  starsound = loadSound("starhit.mp3");
  gameover = loadSound("gameover.mp3");
  
}


function setup() {
  createCanvas(600,600);

  space = createSprite(300,300);
  space.addImage(spaceImage);
  space.velocityY = 1;
  space.scale = 5;

  starGroup = new Group();
  rockGroup = new Group();
  

  ship = createSprite(200,500,50,50);
  ship.addImage(shipImage);
  ship.scale = 0.09;

  
  
  
  
}

function draw() {
  background(0);
  if (gamestate === "play") {
    
    if (keyDown("left_arrow")) {
      ship.x -= 5;
    }
    if (keyDown("right_arrow")) {
      ship.x += 5;
    }
    if (space.y > 400) {
      space.y = 300;
    }
    if (ship.isTouching(rockGroup)) {
      gameover.play();
      space.velocityY = 0;
      rockGroup.destroyEach();
      starGroup.destroyEach();
      gamestate = "end";
    }
    if (ship.isTouching(starGroup)) {
      score += 1;
      starsound.play();
      starGroup.destroyEach();
    }
    
  
    drawSprites();
    
    spawnRocks();
    spawnStars();
   

    stroke("white");
    fill("blue");
    textSize(20);
    text("Score: " + score, 200, 100);
  }
  else if (gamestate === "end") {
    
    stroke("white");
    fill("blue");
    textSize(24);
    
    text("Press R To Retry", 260,300);
    stroke("yellow");
    fill("red");
    textSize(45);
    text("Game Over", 200, 200)
    score = 0;

    if (keyDown("R")) {
      reset();
    }
    
  }

}

function spawnRocks() {
  if (frameCount % 50 === 0) {
    rock = createSprite(200, 200);
    rock.addImage(rockImage);
    rock.scale = 0.2
    rock.x = Math.round(random(120,500));
    rock.velocityY = (4 + score/1);
    rock.lifetime = 400;
    ship.depth = rock.depth;
    ship.depth += 1;
    rockGroup.add(rock);
    
  }
}

function spawnStars() {
  if (frameCount % 50 === 0) {
    star = createSprite(200,15);
    star.addImage(starImage);
    star.scale = 0.2;
    star.velocityY = 2;
    star.x = Math.round(random(120,500));
    star.lifetime = 400;
    ship.depth = star.depth;
    ship.depth += 1;
    starGroup.add(star);
  }
}

function reset() {
  space.velocityY = 1;
  starGroup.velocityY = 2;
  rockGroup.velocityY = (4 + score/1);
  gamestate = "play";
  
}



