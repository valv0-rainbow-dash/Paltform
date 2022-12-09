var number = 0;

function plusOne(count) {
  number++;
  count.textContent = number.toString();
}

class Player extends Body {
  constructor(body) {
    super(body, "player");
    this.speed = 0;
    this.supports = [];
    this.sensors = {};
    this.dashTimer = config.player.dashTime;
    this.canDash = false;
    this.angleCollisions = [];
    this.died = false;
  }

  // Draw the player on the canvas
  draw() {
    fill(150);
    let pos = this.body.position;
    let angle = this.body.angle;
    beginShape();
    for (var i = 0; i < this.body.vertices.length; i++) {
      vertex(this.body.vertices[i].x, this.body.vertices[i].y);
    }
    endShape();
  }

  // Run the player and functionalize commands
  run() {
    this.emit("update");
    // Blocks the player is touching
    const supports = bodies.filter(x => x.type === "block").map(x => {
      return x.supports.length > 0 ? x.supports : false
    }).filter(x => x).flat(2);

    // What angles touching blocks are touching the player at (tangents)
    let angleCollisions = [...new Set(bodies.filter(x => x.type === "block").map(x => x.angleCollision).filter(x => x !== null).map(x => Number(x) + 90))];
    if(JSON.stringify(this.angleCollisions) !== JSON.stringify(angleCollisions)){
      this.angleCollisions = angleCollisions;
      this.emit("collide", angleCollisions);
    }
    

    // Set the player's inertia to infinity so that it stays upright and doesn't rotate to external forces
    bd.setInertia(this.body, 10000);
    
    // Sensors for touching blocks
    this.sensors = {
      // Whether the player is standing on something
      bottom: supports.some(s => Math.round(s.y) === Math.round(this.body.position.y + config.player.height / 2)),

      // Is the player touching a block on the left?
      left: supports.filter(s => Math.round(s.y) !== Math.round(this.body.position.y + config.player.height / 2)).some(s => Math.round(s.x) === Math.round(player.body.position.x - config.player.width / 2)),

      // Is the player touching a block on the right?
      
      right: supports.filter(s => Math.round(s.y) !== Math.round(this.body.position.y + config.player.height / 4)).some(s => Math.round(s.x) === Math.round(player.body.position.x + config.player.width / 4))
    
    }
    //this.angleCollisions.some(x => x === 180)
    //this.angleCollisions.some(x => x === 0)

    // Moving Right
    
    if (keys["ArrowRight"] || keys["d"]) {
      if(this.speed < config.player.speed) this.speed += config.player.acceleration;
      else this.speed += (config.player.speed - this.speed) / config.player.decceleration/5
      this.emit("move.left", this);
    }

    // Moving Left
    if (keys["ArrowLeft"] || keys["a"]) {
      if(this.speed > -config.player.speed) this.speed -= config.player.acceleration;
      else this.speed += (-config.player.speed - this.speed) / config.player.decceleration/5
      this.emit("move.right", this);
    }

    // If not moving right or left, slow down
    if(!keys["ArrowRight"] && !keys["ArrowLeft"] && !keys["a"] && !keys["d"]){
      this.speed += -this.speed/config.player.decceleration;
    }

    // Apply Velocity
    bd.setVelocity(this.body, {
      x: this.speed,
      y: constrain(this.body.velocity.y, -config.world.maxYVel, config.world.maxYVel)
    });
 
    // Jumping and Wall-jumping
    if (keys["ArrowUp"] || keys["w"] || keys[" "]) {
      // If not touching left and right walls, wall-jump
      if (this.sensors.bottom && !this.sensors.left && !this.sensors.right) {
        bd.translate(this.body, {
          x: 0,
          y: -5
        });
        bd.applyForce(this.body, { 
          x: this.body.position.x,
          y: this.body.position.y + config.player.height / 2
        }, { 
          x: 0,
          y: -5
            //config.player.jumpForce
        });
        this.sensors.bottom = false;
        this.emit("jump.up", this);
        this.i
      } else {
        if(config.player.actions.includes("wall jump")) {
          // Jump off a wall depending on which side the player is touching
          if (this.sensors.left) {
            this.speed = config.player.speed/2;
            bd.setVelocity(this.body, {
              x: config.player.jumpForce*2,
              y: -config.player.jumpForce
            })
            bd.translate(this.body, {
              x: 5,
              y: -5
            });
            bd.applyForce(this.body, { 
              x: this.body.position.x, 
              y: this.body.position.y 
            }, { 
              x: config.player.jumpForce * 2, 
              y: -config.player.jumpForce
            });
            this.emit("jump.left", this);
            this.sensors.left = false;
          } else if (this.sensors.right) {
            this.speed = -config.player.speed/2;
            bd.setVelocity(this.body, {
              x: -config.player.jumpForce*2,
              y: -config.player.jumpForce
            })
            bd.translate(this.body, {
              x: -5,
              y: -5
            });
            bd.applyForce(this.body, { 
              x: this.body.position.x, 
              y: this.body.position.y 
            }, { 
              x: -config.player.jumpForce * 2, 
              y: -config.player.jumpForce
            });
            this.emit("jump.right", this);
            this.sensors.right = false;
          }
        }
      }
    }

    // Dash
    if(config.player.actions.includes("dash")){
      if(!this.canDash) this.canDash = this.sensors.bottom;
      if(this.dashTimer > 0) this.dashTimer--;
      if(keys["Shift"] && this.dashTimer <= 0 && this.canDash) {
        if((keys["ArrowRight"] || keys["d"]) && (!keys["ArrowLeft"] && !keys["a"])){
          this.speed = config.player.speed * 4;
          bd.setVelocity(this.body, {
            x: this.speed,
            y: -config.player.speed * 0.5
          });
        } else if((keys["ArrowLeft"] || keys["a"]) && (!keys["ArrowRight"] && !keys["d"])) {
          this.speed = config.player.speed * -4;
          bd.setVelocity(this.body, {
            x: this.speed,
            y: -config.player.speed * 0.5
          });
        }
        this.emit("dash", this);
        this.canDash = false;
        this.dashTimer = config.player.dashTime;
      }
    }

    // Dying
    if(this.body.position.y > (levels[level].bitmap.length * config.world.blockSize) + 500) {
      plusOne(count)
      this.died = true;
}
    }
  }

const configPlayerEvents = () => {
  player.on("update", () => {
    
  })
  
  player.on("collide", (angles) => {
    
  });

  player.on("dash", (p) => {
    
  });

  player.on("jump.up", (p) => {
    
  })

  player.on("jump.left", (p) => {
    
  })

  player.on("jump.right", (p) => {
    
  })

  player.on("move.left", (p) => {
    
  })

  player.on("move.right", (p) => {
    
  })
}