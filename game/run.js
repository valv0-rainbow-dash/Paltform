const configLevel = () => {
  textFade = 255;
  World.clear(engine.world);
  Engine.clear(engine);
  bodies = [];
  for (let y in levels[level].bitmap) {
    let row = levels[level].bitmap[y];
    for (let x in row) {
      let char = row[x];
      if (char !== " ") {
        if (char === "@") {
          player = new Player(Bodies.rectangle(x * config.world.blockSize, y * config.world.blockSize, config.player.width, config.player.height));
          configPlayerEvents();
          bodies.push(player);
        } else {
          bodies.push(new Block(char, x * config.world.blockSize, y * config.world.blockSize));
        }
      }
    }
  }
}

function setup() {
  createCanvas(800, 400);
  angleMode(RADIANS);
  rectMode(CENTER);
  noStroke();

  engine = Engine.create({
    gravity: {
      y: config.world.gravity
    }
  });
  world = engine.world;
  Matter.Runner.run(engine);

  configLevel();
}

// Camera Coordinates
let cameraX = 0, cameraY = 0;
function draw() {
  if(scene === "menu") {
    background(200);
    textFont("Impact", 25);
    textAlign(CENTER, CENTER);
    text("Paltform version 0.1.4a\n\nWASD/Flèches - Bouger\nEspace/W/Flèche Haut - Sauter/Walljump\nSHIFT + Mouvement - faire un dash\n\nClique ici pour commencer", width/2, height/2);
    if(mouseIsPressed){
      scene = "game";
    }
  }
  else if (scene === "game") {
    background(200);
    push();
    if (config.world.camera) {
      cameraX += ((width / 2 - player.body.position.x) - cameraX) / config.world.cameraFriction;
      cameraY += ((height / 2 - player.body.position.y) - cameraY) / config.world.cameraFriction
    }
    translate(cameraX, cameraY);

    bodies.forEach(body => {
      body.run();
      body.draw();
    });

    pop();

    if(levels[level].message){
      textFont("Impact", 25);
      fill(0, textFade);
      textAlign(CENTER, CENTER);
      text(levels[level].message, width/2 - 2, height/2 - 2);
      text(levels[level].message, width/2 - 2, height/2 + 2);
      text(levels[level].message, width/2 + 2, height/2 - 2);
      text(levels[level].message, width/2 + 2, height/2 + 2);
      fill(255, textFade);
      text(levels[level].message, width/2, height/2);
      if(textFade > 0){
        textFade -= 1;
      }
    }

    if (player.died) {
      configLevel();
      player.died = false;
    }

    if (nextLevel) {
      if (levels[level + 1]) {
        level++;
        configLevel();
        nextLevel = false;
      } else {
        scene = "win"
      }
    }
  } 
  else if(scene === "win") {
    background(200, 250, 200);
    textFont("Impact", 25);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Vous avez gagné(e)!", width/2, height/2);
  }
}

function keyPressed() {
  keys[key] = true;
}
function keyReleased() {
  keys[key] = false;
}