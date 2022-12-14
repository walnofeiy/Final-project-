
//
// Game settings and parameters
// Basis for both design and mechanics
//
const grassColor = '#4cbc42';
const roadColor = '#696969';
const chickenCrownColor = '#ff0000';
const chickenColor = '#ffffff';
const enemyColor = '#ffff00';
const roadHeight = 64;
const moveX = 64;
const numberRoads = 10;
const bottomOffset = 40;


// 
// Car classes 
//

/**
 * Car object class
 */
class car {
  /**
   * Create a car object given x and y coordinates
   * @param {*} _x initial x-coordinate of the car
   * @param {*} _y initial y-coordinate of the car
   * @param {*} speed car speed 
   * @param {*} direciton direction of the car's motion
   */
  constructor(_x, _y, speed, direction) {
    // Save the parameters in here x, y, color, speed
    this.xpos = _x;
    this.ypos = _y;
    this.r = random(128, 255);
    this.g = random(128, 255);
    this.b = random(128, 255);
    this.speed = speed;
    this.direction = direction;
  }

  /**
   * Display the car 
   */
  display() {
    // Draw the wheels
    fill(0);
    noStroke();
    rect(this.xpos - 12, this.ypos, 10, 30, 30);
    rect(this.xpos + 12, this.ypos, 10, 30, 30);

    // Draw the car body
    noStroke();
    fill(this.r, this.g, this.b);
    rect(this.xpos, this.ypos, 55, 25, 4);

    // Draw the windows
    fill(0);
    if (this.direction == 'L') {
      rect(this.xpos - 10, this.ypos, 8, 18);
      rect(this.xpos + 15, this.ypos, 8, 18);
    } else {
      rect(this.xpos - 15, this.ypos, 8, 18);
      rect(this.xpos + 10, this.ypos, 8, 18);
    }

    // Draw the headlights 
    fill(255, 255, 0);
    if (this.direction == 'L') {
      arc(this.xpos - 27, this.ypos - 5, 6, 6, PI + HALF_PI, HALF_PI);
      arc(this.xpos - 27, this.ypos + 5, 6, 6, PI + HALF_PI, HALF_PI);
    } else {
      arc(this.xpos + 27, this.ypos - 5, 6, 6, HALF_PI, PI + HALF_PI);
      arc(this.xpos + 27, this.ypos + 5, 6, 6, HALF_PI, PI + HALF_PI);
    }

    // Draw the taillights 
    fill(255, 0, 0);
    if (this.direction == 'R') {
      arc(this.xpos - 27, this.ypos - 6, 5, 5, PI + HALF_PI, HALF_PI);
      arc(this.xpos - 27, this.ypos + 6, 5, 5, PI + HALF_PI, HALF_PI);
    } else {
      arc(this.xpos + 27, this.ypos - 6, 5, 5, HALF_PI, PI + HALF_PI);
      arc(this.xpos + 27, this.ypos + 6, 5, 5, HALF_PI, PI + HALF_PI);
    }
  }

  /**
   * Move the car to the right 
   */
  moveR() {
    this.xpos += this.speed;
  }

  /**
   * Move the car to the left 
   */
  moveL() {
    this.xpos -= this.speed;
  }

  /**
   * Stop the car 
   */
  stop() {
    this.speed = 0;
  }

  /**
   * Check if the x and y coordinates are within the hit bounds of the car
   * @param {*} x x-coordinate of the test point
   * @param {*} y y-coordinate of the test ponit
   * @returns 
   */
  contains(x, y) {
    // Check if point is within the car's hit box 
    return (this.xpos - 30) < x && x < (this.xpos + 30) && (this.ypos - 10) < y && y < (this.ypos + 10);
  }
}


//
// Screen classes 
//

/**
 * Start screen class 
 */
class startScreen {

  constructor() {
    // Create the cars here 
    this.cars = [];
  }

  init() {
    for (let i = 0; i < 5; i++) {
      this.cars.push(new car(width + 100 * i, height / 2 - roadHeight, 4, 'L'));
      this.cars.push(new car(0 - 100 * i, height / 2 + roadHeight, 4, 'R'));
    }
  }

  /**
   * Draw the starting screen on the canvas 
   */
  draw() {
    // Draw the background color first 
    fill(0, 0, 0, 200);
    noStroke();
    rect(width / 2, height / 2, 0.8 * width, 0.8 * height);

    // Draw the text 
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Crossy Road Game\nby Wejdan Alnofeiy", width / 2, height / 4, 0.8 * width, 0.4 * height);
    textSize(12);
    text("Press <space> to show instructions", width / 2, height * 3 / 4, 0.8 * width, 0.4 * height);

    // Display the chicken at the middle of the start screen 
    Chicken.xpos = width / 2;
    Chicken.ypos = height / 2;
    Chicken.display();

    // Display the cars 
    this.cars.forEach(car => car.display());

    // Move the cars 
    this.cars.forEach(car => {
      if (car.direction == 'L') {
        car.moveL();
        // Wrap around
        if (car.xpos < 0) {
          car.xpos = width;
        }
      } else {
        car.moveR();
        // Wrap around 
        if (car.xpos > width) {
          car.xpos = 0;
        }
      }
    });
  }
}

/**
 * Instruction screen class 
 */
class instructionScreen {

  constructor() {
    // Create the cars here 
    this.cars = [];
  }

  init() {
    for (let i = 0; i < 5; i++) {
      this.cars.push(new car(width + 100 * i, height / 2 - roadHeight, 4, 'L'));
      this.cars.push(new car(0 - 100 * i, height / 2 + roadHeight, 4, 'R'));
    }
  }

  /**
   * Draw the instruction screen on the canvas 
   */
  draw() {
    // Display the cars 
    this.cars.forEach(car => car.display());

    // Draw the background color first 
    fill(0, 0, 0, 200);
    noStroke();
    rect(width / 2, height / 2, 0.8 * width, 0.8 * height);

    // Draw the instructions text 
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Crossy Road Game\nby Wejdan Alnofeiy", width / 2, height / 4, 0.8 * width, 0.4 * height);
    textSize(12);

    // Define the instructions text here
    textAlign(LEFT, CENTER);
    let instr = `Press W, A, S, D to move the chicken

    Difficulty levels:
    - Easy - Chicken crosses the roads alone.
    - Medium - Race against an NPC.
    - Hard - Race against an NPC with faster cars.
    
    Press 
    - <1> to start in easy mode
    - <2> to start in medium mode
    - <3> to start int difficult mode.
    `;
    fill('#ffffe0');
    text(instr, width / 2, height * 3 / 4 - 20, 0.6 * width, 0.4 * height);

    // Draw the chicken
    Chicken.xpos = width / 2;
    Chicken.ypos = height / 2 - 40;
    Chicken.display();

    // Move the cars 
    this.cars.forEach(car => {
      if (car.direction == 'L') {
        car.moveL();
        // Wrap around
        if (car.xpos < 0) {
          car.xpos = width;
        }
      } else {
        car.moveR();
        // Wrap around 
        if (car.xpos > width) {
          car.xpos = 0;
        }
      }
    });
  }
}

/**
 * Win screen class 
 */
class winScreen {

  /**
   * Draw the win screen on the canvas.
   */
  draw() {
    // Draw the background first
    fill(0, 0, 0, 200);
    noStroke();
    rect(width / 2, height / 2, 0.8 * width, 0.8 * height);

    // Draw the text 
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("You Won!", width / 2, height / 4, 0.8 * width, 0.4 * height);
    text(`Score: ${score}`, width / 2, height / 2, 0.8 * width, 0.4 * height);
    textSize(12);
    text("Press <space> to show instructions", width / 2, height * 3 / 4, 0.8 * width, 0.4 * height);
  }
}

/**
 * Game over screen class 
 */
class gameOverScreen {

  /**
   * Draw the gameover screen 
   */
  draw() {
    // Draw the background first 
    fill(0, 0, 0, 200);
    noStroke();
    rect(width / 2, height / 2, 0.8 * width, 0.8 * height);

    // Draw the text in the gameover screen
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 4, 0.8 * width, 0.4 * height);

    text(`Score: ${score}`, width / 2, height / 2, 0.8 * width, 0.4 * height);
    textSize(12);
    text("Press <space> to show instructions", width / 2, height * 3 / 4, 0.8 * width, 0.4 * height);
  }
}

//
// Create the screens 
//
const InstructionScreen = new instructionScreen();
const StartScreen = new startScreen();
const WinScreen = new winScreen();
const GameOverScreen = new gameOverScreen();

//
// Game variables 
//
let screen = StartScreen;
let Chicken = null;
let Enemy = null;
let lives = 0;
let score = 0;
let level = 1;
let gameOver = true;

// Game objects
//
const roads = [];

//
// Object classes 
//

/**
 * Road object class 
 */
class road {
  /**
   * Construct a new road object
   * @param {*} ypos y-position of the road center line 
   * @param {*} movement movement direction of the cars on this road: left - 'L' or right - 'R'
   * @param {*} spawnInterval interval between spawning of new car (in number of frames)
   * @param {*} spawnProb probability of spawning a new car within the interval
   * @param {*} carSpeed speed of the car 
   */
  constructor(ypos, movement, spawnInterval, spawnProb, carSpeed) {
    this.ypos = ypos;
    this.cars = [];
    this.movement = movement;
    this.interval = spawnInterval;
    this.prob = spawnProb;
    this.speed = carSpeed;
  }

  /**
   * Draw the road design 
   */
  draw() {
    // Draw road background
    noStroke();
    fill(roadColor);
    rect(width / 2, this.ypos, width, roadHeight);

    // Draw the road lines 
    this.roadlines(this.ypos);

    // Draw the cars
    this.cars.forEach(car => car.display());
  }

  /**
   * Computes the spawn location of cars in the left side of the road
   * @returns y-coordinate of the spawn location
   */
  leftSpawnLoc() {
    return -60;
  }

  /**
   * Computes the spawn location of cars in the right side of the road
   * @returns y-coordinate of the spawn location
   */
  rightSpawnLoc() {
    return width + 60;
  }

  /**
   * Spawn a new car 
   */
  spawn() {
    // Create a car if the chance is greater than the specified spawn probability
    if ((frameCount % this.interval) == 0 && random() > this.prob) {
      if (this.movement == 'L') {
        // If the cars are moving to the left
        // Add if there is no car on the spawn location
        let canSpawn = true;
        for (let i = 0; i < this.cars.length; i++) {
          if (this.cars[i].xpos > (width - 60)) {
            canSpawn = false;
            break;
          }
        }

        if (canSpawn)
          this.cars.push(new car(this.rightSpawnLoc(), this.ypos, this.speed, this.movement));
      } else {
        // IF the cars are moving to the right
        // Add if there is no car on the spawn location
        let canSpawn = true;
        for (let i = 0; i < this.cars.length; i++) {
          if (this.cars[i].xpos < 60) {
            canSpawn = false;
            break;
          }
        }

        if (canSpawn)
          this.cars.push(new car(this.leftSpawnLoc(), this.ypos, this.speed, this.movement));
      }
    }
  }

  /**
   * Move the cars on the raod 
   */
  move() {
    // For each car, move it according to the specified direction
    this.cars.forEach(car => {
      if (this.movement == 'L') {
        car.moveL();
      } else {
        car.moveR();
      }
    }, this);

    // Filter cars out of bounds
    // Remove cars that are going outside the view 
    if (this.movement == 'L') {
      this.cars = this.cars.filter(car => !(car.xpos < this.leftSpawnLoc()), this);
    } else {
      this.cars = this.cars.filter(car => !(car.xpos > this.rightSpawnLoc()), this);
    }
  }

  /**
   * Draw the road lines of the road
   * @param {*} ypos y-coordinate of the center lines 
   */
  roadlines(ypos) {
    // Draw the center lines of the road
    for (let i = 0; i < width; i += 40) {
      stroke(255);
      line(i, ypos, i + 25, ypos);
    }
  }
}

/**
 * Calculate the value of a periodic movement given the current frame count and parameters
 * @param {*} min minimum value 
 * @param {*} max maximum value
 * @param {*} freq frequency of the oscillation in (cycles per frames)
 * @param {*} phase initial phase of the oscillation
 * @returns the present value of the oscillation 
 */
function periodicMovement(min, max, freq, phase) {
  let s = sin(2 * PI * frameCount / freq + phase);
  return min + (max - min) / 2 * s;
}


/**
 * Chicken object class 
 */
class chicken {
  /**
   * Create a chicken object
   */
  constructor() {
    // Save the parameters in here -size,x,y
    this.xpos = width / 2;
    this.ypos = 0;
    this.isMoving = false;
    this.speed = 10;
    this.targetX = this.xpos;
    this.targetY = this.ypos;
  }

  /**
   * Display the chicken
   */
  display() {
    // Draw the chicken using rect
    noStroke();
    fill(chickenColor);
    rect(this.xpos, this.ypos, 30, 50);

    // Compute the location of the wings based on periodic motion
    let wingsY = periodicMovement(-1, 5, 50, 0);

    // Draw the wings
    rect(this.xpos - 20, this.ypos + wingsY, 10, 20);
    rect(this.xpos + 20, this.ypos + wingsY, 10, 20);

    // Draw the crown
    fill(chickenCrownColor);
    rect(this.xpos, this.ypos - 27, 10, 15);

    // Draw the eyes
    fill(0);
    rect(this.xpos - 7, this.ypos - 8, 5);
    rect(this.xpos + 7, this.ypos - 8, 5);

    // Draw the beak
    fill(255, 0, 0);
    rect(this.xpos, this.ypos, 6, 6);
    fill(255, 100, 0);
    rect(this.xpos, this.ypos + 6, 4, 6)

    // Draw the feet
    let feetX = this.isMoving ? periodicMovement(-2, 2, 50, PI) : 0;
    fill(255, 100, 0);
    rect(this.xpos - 7 - feetX, this.ypos + 30, 4, 10);
    rect(this.xpos + 7 + feetX, this.ypos + 30, 4, 10);
  }

  /**
   * Move the chicken 
   */
  move() {
    this.isMoving = false;

    if (this.ypos < this.targetY) {
      this.ypos = min(this.ypos + this.speed, this.targetY);
      this.isMoving = true;
    } else if (this.ypos > this.targetY) {
      this.ypos = max(this.ypos - this.speed, this.targetY);
      this.isMoving = true;
    }

    if (this.xpos < this.targetX) {
      this.xpos = min(this.xpos + this.speed, this.targetX);
      this.isMoving = true;
    } else if (this.xpos > this.targetX) {
      this.xpos = max(this.xpos - this.speed, this.targetX);
      this.isMoving = true;
    }
  }

  /**
   * Move the chicken up a road 
   */
  moveUp() {
    if (!this.hitsEnemy(this.xpos, this.ypos - roadHeight)) {
      //this.ypos -= roadHeight;
      this.targetY -= roadHeight;
    }
  }

  /**
   * Check if the chicken hits the enemy
   * @param {*} x x-coordinate of the enemy
   * @param {*} y y-coordinate of the enemy
   * @returns true if hit, false otherwise
   */
  hitsEnemy(x, y) {
    return level > 1 && Enemy.xpos == x && Enemy.ypos == y;
  }

  /**
   * Move the chicken down a road
   */
  moveDown() {
    if (this.ypos < 0 && !this.hitsEnemy(this.xpos, this.ypos + roadHeight)) {
      //this.ypos += roadHeight;
      this.targetY += roadHeight;
    }
  }

  /**
   * Move the chicken to the left
   */
  moveLeft() {
    if (this.xpos >= moveX && !this.hitsEnemy(this.xpos - moveX, this.ypos)) {
      //this.xpos -= moveX;
      this.targetX -= moveX;
    }
  }

  /**
   * Move the chicken to the right 
   */
  moveRight() {
    if (this.xpos <= (width - moveX) && !this.hitsEnemy(this.xpos + moveX, this.ypos)) {
      //this.xpos += moveX;
      this.targetX += moveX;
    }
  }
}

/**
 * Enemy object class
 */
class enemy {
  /**
   * Create a new enemy
   * The enemy has two states:
   * 1 - grass
   * 2 - road
   */
  constructor() {
    // Save the parameters in here -size,x,y
    this.xpos = width / 2 + moveX;
    this.ypos = 0;
    this.state = 1;
    this.interval = 30;
  }

  /**
   * Draw the enemy 
   */
  display() {
    // Draw the enemy person 
    noStroke();
    fill(enemyColor);
    rect(this.xpos, this.ypos + 15, 30, 30);

    // Compute the arms of the enemy
    let armsY = periodicMovement(-1, 5, 50, 0);

    // Draw the arms
    rect(this.xpos - 20, this.ypos + 12 + armsY, 10, 20);
    rect(this.xpos + 20, this.ypos + 12 + armsY, 10, 20);

    // Draw the head
    fill(enemyColor);
    circle(this.xpos, this.ypos - 10, 30);

    // Draw the eyes
    fill(0);
    rect(this.xpos - 7, this.ypos - 10, 5);
    rect(this.xpos + 7, this.ypos - 10, 5);

    // Draw the mouth
    fill(0, 0, 0);
    rect(this.xpos, this.ypos - 2, 6, 6);

    // Draw the feet
    fill(0, 0, 0);
    rect(this.xpos - 7, this.ypos + 30, 4, 10);
    rect(this.xpos + 7, this.ypos + 30, 4, 10);
  }

  /**
   * Move the enemy up
   */
  moveUp() {
    this.ypos -= roadHeight;
  }

  /**
   * Move the enemy down 
   */
  moveDown() {
    if (this.ypos < 0) {
      this.ypos += roadHeight;
    }
  }

  /**
   * Move the enemy to the left 
   */
  moveLeft() {
    if (this.xpos >= moveX) {
      this.xpos -= moveX;
    }
  }

  /**
   * Move the enemy to the right
   */
  moveRight() {
    if (this.xpos <= (width - moveX)) {
      this.xpos += moveX;
    }
  }

  /**
   * Get the road at a specified y-coordinate 
   * @param {*} y y-coordinate 
   * @returns road object if y is on a road, null otherwise
   */
  getRoad(y) {
    // Find if this is on the road or not
    let rd = null;
    for (let i = 0; i < roads.length; i++) {
      if (roads[i].ypos == y) {
        return roads[i];
      }
    }

    return null;
  }

  /**
   * Get the road up ahead the enemy
   * @returns road up ahead if present, null otherwise
   */
  getRoadAhead() {
    return this.getRoad(this.ypos - roadHeight);
  }

  /**
   * Check if there is a car on a road at a specified coordinate location (x, y)
   * @param {*} rd road 
   * @param {*} x x-coordinate
   * @param {*} y y-coordinate
   * @returns car object if present, null otherwise
   */
  isThereACar(rd, x, y) {
    for (let i = 0; i < rd.cars.length; i++) {
      if (rd.cars[i].contains(x - 30, y) || rd.cars[i].contains(x + 30, y)) {
        return rd.cars[i];
        break;
      }
    }

    return null;
  }

  /**
   * Move the enemy 
   */
  move() {
    // Move the enemy on the specified interval only 
    if (frameCount % this.interval != 0)
      return;

    // Enemy is in the grass state
    if (this.state === 1) {
      // Grass state
      // Find if this is on the road or not
      let rd = this.getRoadAhead();

      if (rd != null) {
        // Next is a road 
        // Check if there is a car 
        let cr = this.isThereACar(rd, this.xpos, this.ypos - roadHeight);

        // There is no car
        if (cr == null) {
          this.moveUp();
          this.state = 2;
        }
      } else {
        // Next is grass 
        this.moveUp();
        this.state = 1;
      }
    } else {
      // Enemy is in the road state 
      // Road state 
      let rd = this.getRoadAhead();

      if (rd == null) {
        // Next is grass
        this.moveUp();
        this.state = 1;
      } else {
        // Next is road 
        // Check if there is a car 
        let cr = this.isThereACar(rd, this.xpos, this.ypos - roadHeight);

        // There is no car
        if (cr == null) {
          this.moveUp();
        } else {
          rd = this.getRoad(this.ypos);
          if (rd != null) {
            // Do nothing. Wait for next 
            // Move to left/right
            if (rd.movement == 'L') {
              if (!this.isThereACar(rd, this.xpos - moveX, this.ypos))
                this.moveLeft();
            } else {
              if (!this.isThereACar(rd, this.xpos + moveX, this.ypos))
                this.moveRight();
            }
          }
        }
      }
    }
  }

}

/**
 * Setup the game 
 */
function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);

  Chicken = new chicken();
  Enemy = new enemy();

  StartScreen.init();
  InstructionScreen.init();
}

/**
 * Draw the heart 
 * @param {*} x x-coordinate of the heart
 * @param {*} y y-coordinate of the heart
 * @param {*} size size of the heart 
 */
function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

/**
 * Draw a life point marker on a specific location
 * @param {*} x x-coordinate
 * @param {*} y y-coordinate 
 */
function drawLife(x, y) {
  fill('#FF0000');
  noStroke();
  heart(x, y - 10, 20);
}

/**
 * Draw the game on the canvas
 */
function draw() {
  background(grassColor);

  // Apply view transformation 
  push();

  // Spawn and move cars 
  roads.forEach(rd => { rd.spawn(); rd.move(); });

  // Move the enemy
  if (level > 1 && !gameOver) {
    Enemy.move();
  }

  // Keep the chicken in the middle of the game 
  translate(0, height / 2 - Chicken.ypos);
  roads.forEach(rd => rd.draw());
  checkCollision();

  if (screen == null) {
    Chicken.move();
    Chicken.display();
  }

  // Display the enemy only on levels 2 and 3
  if (level > 1) {
    Enemy.display();
  }

  pop();

  // Display splash screens
  if (screen != null) {
    screen.draw();
  } else {
    // Display game details
    drawLives();
    displayScore();
    displayLevel();
  }

  // Check if we win 
  if (!gameOver && Chicken.ypos < roads[roads.length - 1].ypos) {
    gameOver = true;
    score = computeScore();
    screen = WinScreen;
  }

  // Check if enemy is done
  if (!gameOver && level > 1 && Enemy.ypos < roads[roads.length - 1].ypos) {
    gameOver = true;
    score = computeScore();
    screen = GameOverScreen;
  }
}

/**
 * Keyboard key is pressed
 */
function keyPressed() {
  if (gameOver) {
    if (keyCode == 32) {
      if (screen === StartScreen) {
        screen = InstructionScreen;
      } else if (screen === WinScreen) {
        screen = InstructionScreen;
      } else if (screen === GameOverScreen) {
        screen = InstructionScreen;
      }
    } else if (screen === InstructionScreen) {
      // Check the level
      switch (keyCode) {
        case 49:
          level = 1;
          initLevel1();
          break;
        case 50:
          level = 2;
          initLevel2();
          break;
        case 51:
          level = 3;
          initLevel3();
          break;
        default:
          level = 0;
          break;
      }

      if (level > 0) {
        // Hide splash screens
        screen = null;

        // Move the chicken below to starting point 
        Chicken.ypos = 0;
        Chicken.xpos = width / 2;
        Chicken.targetY = 0;
        Chicken.targetX = width / 2;

        // Move the enemy to the starting point 
        if (level > 1) {
          Enemy.ypos = 0;
          Enemy.xpos = width / 2 + moveX;
        }

        // Record start game time 
        lives = 3;
        gameOver = false;
      }
    }
  } else {
    // Check for arrow keys 
    if (keyCode == 68) {
      Chicken.moveRight();
    } else if (keyCode == 65) {
      Chicken.moveLeft();
    } else if (keyCode == 87) {
      Chicken.moveUp();
    } else if (keyCode == 83) {
      Chicken.moveDown();
    }
  }
}

/**
 * Find the nearest grass at a specified y-coordinate
 * @param {*} y y-coordinate
 * @returns y-coordinate of the nearest grass 
 */
function findNearestGrass(y) {
  let i = roads.length - 1;

  // Find the road where y is on
  for (; i >= 0; i--) {
    if (roads[i].ypos >= y) {
      break;
    }
  }

  // Continue moving down 
  while (i >= 0 && roads[i].ypos == y) {
    y += roadHeight;
    i--;
  }

  // Check if y is on grass
  return y;
}

/**
 * Chicken dies
 */
function die() {
  // Subtract the number of lives
  lives--;

  if (lives == 0) {
    // Chicken has no more lives and is dead
    score = computeScore();
    gameOver = true;
    screen = GameOverScreen;
    Chicken.xpos = width / 2;
    Chicken.ypos = 0;
    Chicken.targetX = width / 2;
    Chicken.targetY = 0;
    level = 0;
  } else {
    // Chicken has another chance
    // Move back to the nearest grass 
    Chicken.ypos = findNearestGrass(Chicken.ypos);
    Chicken.targetY = Chicken.ypos;
  }
}

/**
 * The enemy died 
 */
function enemyDie() {
  // Move back to the nearest grass 
  Enemy.ypos = findNearestGrass(Enemy.ypos);
}

/**
 * Check if the chicken was hit by the car 
 * @param {*} cars array of cars to check
 */
function checkCollisionWithCars(cars) {
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].contains(Chicken.xpos, Chicken.ypos)) {
      die();
      break;
    }

    if (level > 1 && cars[i].contains(Enemy.xpos, Enemy.ypos)) {
      enemyDie();
    }
  }
}

/**
 * Check if there is a collision 
 */
function checkCollision() {
  // Check if there is a collision 
  roads.forEach(rd => checkCollisionWithCars(rd.cars));
}

/**
 * Compute the total score of the chicken. 
 * Score is based on the distance travelled from the starting point 
 * @returns 
 */
function computeScore() {
  if (screen != null)
    return 0;
  else
    return -Chicken.ypos / roadHeight;
}

/**
 * Display the current score of the game
 */
function displayScore() {
  fill(255);
  textSize(20);
  textAlign(RIGHT, CENTER);
  text(`Score: ${computeScore()}`, width - 20, height - bottomOffset);
}

/**
 * Display the current level of the game
 */
function displayLevel() {
  fill(255);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(`Level ${level}`, width / 2, height - bottomOffset);
}

/**
 * Draw the remaining lives of the chicken 
 */
function drawLives() {
  for (let i = 0; i < lives; i++) {
    drawLife(20 + i * 30, height - bottomOffset);
  }
}

/**
 * Initialize level 1 game 
 */
function initLevel1() {
  // Clear the roads
  roads.length = 0;

  // Define road parameter functions
  let roadMovement = (index) => {
    return index % 2 == 0 ? 'L' : 'R';
  };

  let roadSpawnInterval = (index) => {
    return max(10, 30 - 2 * index);
  };

  let roadSpawnProb = (index) => {
    return min(0.7, 0.5 + 0.02 * index);
  };

  let roadCarSpeed = (index) => {
    return min(5, 3 + 0.04 * index);
  };

  // Create random roads
  for (let y = -roadHeight; roads.length < numberRoads;) {
    roads.push(new road(y,
      roadMovement(roads.length),
      roadSpawnInterval(roads.length),
      roadSpawnProb(roads.length),
      roadCarSpeed(roads.length)));

    // Compute spacing in random 
    let space = round(random(1, 3));
    y -= space * roadHeight;
  }

}

/**
 * Initialize level 2 of the game 
 */
function initLevel2() {
  // Clear the roads
  roads.length = 0;

  // Define road parameter functions
  let roadMovement = (index) => {
    return index % 2 == 0 ? 'L' : 'R';
  };

  let roadSpawnInterval = (index) => {
    return max(10, 30 - 2 * index);
  };

  let roadSpawnProb = (index) => {
    return min(0.7, 0.5 + 0.02 * index);
  };

  let roadCarSpeed = (index) => {
    return min(5, 3 + 0.04 * index);
  };

  // Create random roads
  for (let y = -roadHeight; roads.length < numberRoads;) {
    roads.push(new road(y,
      roadMovement(roads.length),
      roadSpawnInterval(roads.length),
      roadSpawnProb(roads.length),
      roadCarSpeed(roads.length)));

    // Compute spacing in random 
    let space = round(random(1, 3));
    y -= space * roadHeight;
  }

}

/**
 * Initialize level 3 of the game 
 */
function initLevel3() {
  // Clear the roads
  roads.length = 0;

  // Define road parameter functions
  let roadMovement = (index) => {
    return index % 2 == 0 ? 'L' : 'R';
  };

  let roadSpawnInterval = (index) => {
    return max(10, 30 - 3 * index);
  };

  let roadSpawnProb = (index) => {
    return min(0.9, 0.5 + 0.04 * index);
  };

  let roadCarSpeed = (index) => {
    return min(8, 3 + 0.1 * index);
  };

  // Create random roads
  for (let y = -roadHeight; roads.length < 2 * numberRoads;) {
    roads.push(new road(y,
      roadMovement(roads.length),
      roadSpawnInterval(roads.length),
      roadSpawnProb(roads.length),
      roadCarSpeed(roads.length)));

    // Compute spacing in random 
    let space = round(random(1, 3));
    y -= space * roadHeight;
  }

}