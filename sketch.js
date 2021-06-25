

//Player Sprites
var front, back, left, right;
var frontSword, backSword, leftSword, rightSword;
var playerSprite
var health, bossHealth;
var enemyGroup;
var enemy_1, enemy_2, enemy_3, enemy_4, enemy_5, enemy_6, enemy_7;
var enemyImg

var gameStates
var speedX = 3
var speedY = 3
function preload() {
  //loading Images
  lightWaterImage = loadImage("Water.png")

  mapImg = loadImage("Map2.png")

  front = loadImage("Player_Sprites/frontSprite.png")
  back = loadImage("Player_Sprites/backSprite.png")
  left = loadImage("Player_Sprites/leftSprite.png")
  right = loadImage("Player_Sprites/rightSprite.png")

  frontSword = loadImage("Player_Sprites/frontSword.png")
  backSword = loadImage("Player_Sprites/backSword.png")
  leftSword = loadImage("Player_Sprites/leftSword.png")
  rightSword = loadImage("Player_Sprites/rightSword.png")

  shipImg1 = loadImage("Game_Assets/Objects/Other/Ship1.png")

  houseImg1 = loadImage("Game_Assets/Objects/Houses/1.png")
  houseImg2 = loadImage("Game_Assets/Objects/Houses/2.png")
  houseImg3 = loadImage("Game_Assets/Objects/Houses/3.png")
  houseImg4 = loadImage("Game_Assets/Objects/Houses/4.png")
  houseImg5 = loadImage("Game_Assets/Objects/Houses/5.png")
  houseImg6 = loadImage("Game_Assets/Objects/Houses/6.png")

  
  
  enemyImg = loadImage("Enemy_Sprites/EnemyUp.png")
}

function setup() {
  createCanvas(1600, 800);
  enemyGroup = createGroup()
  spawnObjects();

  spawnEnemies();

  // start camera
  camera.on()
  health = 100
  bossHealth = 500

  gameStates = 1
}

function draw() {
  if (gameStates == 1) {
    background('lightblue');
    //collision
    player.collide(lightGreenBoundry)
    player.collide(bridges)
    player.collide(darkgreenBoundry)
    player.collide(ship)
    player.collide(screenBorders)
    player.collide(houses)
    player.collide(bridgeBorder)

    enemyGroup.bounceOff(lightGreenBoundry)
    enemyGroup.bounceOff(darkgreenBoundry)
    enemyGroup.bounceOff(houses)
    enemyGroup.bounceOff(screenBorders)
    // enemies.bounceOff(houses)

    if (frameCount % 30 === 0) {
      enemy_1.velocityX = random(-speedX, speedX)
      enemy_1.velocityY = random(speedY, -speedY)
    }
    if (enemyGroup.isTouching(player)) {
      if(playerSprite === "up"|| playerSprite === "down" || playerSprite === "left" || playerSprite === "right")
      if (frameCount % 10 == 0) {
        health -= Math.round(5)
        // health = Math.round(health)
      }
    }

    if (items === "bridge_key") {
      bridgeBorder.destroy()
    }

    enemyAttack();

    // if (playerSprite === "sword" && player.isTouching(enemyGroup)) {
    //   enemy_1.destroy();
    // }
    // players movement with camera positions
    Movement();



    if (player.y < 542 && player.y > -320 && player.x < 790) {
      if (camera.y >= 10) {
        camera.x = -277
        camera.y = camera.y - 60
      }
    }
    else if (player.x > 790 && player.y <= 342) {
      camera.x = 600
      camera.y = -50
    }

    else if (player.y >= 542) {
      if (camera.y < 900) {
        camera.y = camera.y + 60
        camera.x = -100
      }
    }

    shipMovement();

    drawSprites();
    camera.zoom = 0.8;

    houseEnter();

    fill("red")
    textSize(50)
    if (health > 0) {
      text("HEALTH: " + health, camera.x - 900, camera.y - 450)
    }
    else {
      gameStates = 2
    }
    textSize(50)
    fill("red")
    if (bossHealth > 0) {
      if (camera.x === 600 && camera.y === -50) {
        text("BOSS HEALTH: " + bossHealth, camera.x + 200, camera.y - 450)
      }
      
    }
    else if(bossHealth === 0){
      enemy_6.destroy ();
      // console.log("GAME FINISHED")
      fill("green")
      textAlign(CENTER)
      text("THANKS FOR PLAYING",camera.x,camera.y)
      text("REFRESH PAGE TO PLAY AGAIN",camera.x,camera.y + 100)
    }
  }
  if(gameStates === 2){
    textSize(200)
      textWidth(100)
      fill("blue")
      textAlign(CENTER)
      text("YOU DIED", camera.x, camera.y)
  }
}
