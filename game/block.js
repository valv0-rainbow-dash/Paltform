const shapes = {
  rect: [
    { x: 0, y: 0 },
    { x: config.world.blockSize, y: 0 },
    { x: config.world.blockSize, y: config.world.blockSize },
    { x: 0, y: config.world.blockSize }
  ],
  slopeTL: [
    { x: config.world.blockSize, y: 0 },
    { x: config.world.blockSize, y: config.world.blockSize },
    { x: 0, y: config.world.blockSize }
  ],
  slopeTR: [
    { x: 0, y: 0 },
    { x: config.world.blockSize, y: config.world.blockSize },
    { x: 0, y: config.world.blockSize }
  ],
  slopeBL: [
    { x: 0, y: 0 },
    { x: config.world.blockSize, y: config.world.blockSize },
    { x: config.world.blockSize, y: 0 }
  ],
  slopeBR: [
    { x: 0, y: 0 },
    { x: config.world.blockSize, y: 0 },
    { x: 0, y: config.world.blockSize }
  ],
}

const blockTypes = {
  "0": {
    points: shapes.rect
  },
  "+": {
    points: shapes.rect
  },
  "<": {
    points: shapes.slopeTL
  },
  ">": {
    points: shapes.slopeTR
  },
  "\\": {
    points: shapes.slopeBL
  },
  "/": {
    points: shapes.slopeBR
  },
  "p": {
    points: shapes.rect
  },
  "a": {
    points: [
      { x: 0, y: 0 },
      { x: 800, y: 0 },
      { x: 800, y: 50 },
      { x: 0, y: 50 }
    ]
  },
  "b": {
    points: [
      { x: 0, y: 0 },
      { x: 50, y: 0 },
      { x: 50, y: 400 },
      { x: 0, y: 400 }
    ]
  }
}

class Block extends Body {
  constructor(type, x, y) {
    if(!blockTypes[type]) throw new Error(`Block of type '${type}' does not exist (level ${level}).  Define a new block type or remove it from the level bitmap.`);
    let stats = blockTypes[type];
    let newBody = Bodies.fromVertices(x, y, stats.points, { isStatic: true });
    const { min, max } = newBody.bounds;
    bd.setPosition(newBody, { x: x + (newBody.position.x - min.x), y: y + (newBody.position.y - min.y) })
    super(newBody, "block");
    this.supports = [];
    this.t = type;
    this.angleCollision = null;

    configBlockEvents(this);
  }
  draw() {
    switch(this.t){
      case "0":
      case "<":
      case ">":
      case "\\":
      case "/":
        fill(50);
        let pos = this.body.position;
        let angle = this.body.angle;
        beginShape();
        for (var i = 0; i < this.body.vertices.length; i++) {
          vertex(this.body.vertices[i].x, this.body.vertices[i].y);
        }
        endShape();
      break;
      case "+":
        fill(0, 225, 255);
        ellipse(this.body.position.x, this.body.position.y, config.world.blockSize, config.world.blockSize);
      break;
    }
  }
  run() {
    this.emit("update");
    let col = Collision.collides(this.body, player.body);
    if (col && col.supports) {
      this.emit("collide", [this, player]);
      this.angleCollision = Math.atan2(col.tangent.y, col.tangent.x) / (Math.PI / 180);
      this.supports = col.supports;
    } else {
      this.supports = [];
      this.angleCollision = null;
    }
  }
}

const configBlockEvents = (block) => {
  block.on("collide", (data) => {
    const __player = data[1];
    const __block = data[0];
    if(__block.t === "+") {
      nextLevel = true;
    }
  })

  block.on("update", () => {
    
  })


}