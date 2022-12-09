const configLevel = () => {
  textFade = 255;
  World.clear(engine.world);
  Engine.clear(engine);
  bodies = [];
  for (let y in levelstuto[level].bitmap) {
    let row = levelstuto[level].bitmap[y];
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
  createCanvas(1080, 720);
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
    text("Paltform tutorial\n resolution: 1080 x 720\n\nClick here to begin.", width/2, height/2);
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

    if(levelstuto[level].message){
      textFont("Impact", 25);
      fill(0, textFade);
      textAlign(CENTER, CENTER);
      text(levelstuto[level].message, width/2 - 2, height/2 - 2);
      text(levelstuto[level].message, width/2 - 2, height/2 + 2);
      text(levelstuto[level].message, width/2 + 2, height/2 - 2);
      text(levelstuto[level].message, width/2 + 2, height/2 + 2);
      fill(255, textFade);
      text(levelstuto[level].message, width/2, height/2);
      if(textFade > 0){
        textFade -= 1;
      }
    }

    if (player.died) {
textFont("Impact", 25);
      fill(0, textFade);
      textAlign(CENTER, CENTER);
      text("you ded", width/2 - 2, height/2 - 2);
      text("you ded", width/2 - 2, height/2 + 2);
      text("you ded", width/2 + 2, height/2 - 2);
      text("you ded", width/2 + 2, height/2 + 2);
      fill(255, textFade);
      text("you ded", width/2, height/2);
      if(textFade > 0){
        textFade -= 1;
      }
      configLevel();
      player.died = false;
    }

    if (nextLevel) {
      if (levelstuto[level + 1]) {
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
    text("You complete the tutorial!\n now let's add some challenge..\n retourn to the menu and choose your resolution", width/2, height/2);
  }
}

function keyPressed() {
  keys[key] = true;
}
function keyReleased() {
  keys[key] = false;
}

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.ieRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

let fpsElement = document.getElementById("fps");

let then = Date.now() / 1000;  // get time in seconds

let render = function() {
    let now = Date.now() / 1000;  // get time in seconds

    // compute time since last frame
    let elapsedTime = now - then;
    then = now;

    // compute fps
    let fps = 1 / elapsedTime;
    fpsElement.innerText = fps.toFixed(2);

    requestAnimFrame(render);
};
render();

