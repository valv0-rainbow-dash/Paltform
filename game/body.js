// A class for all bodies displayed in p5.js
class Body {
  constructor(body, type) {
    this.body = body;
    this.type = type || "body";
    this.dead = false;
    this.callbacks = {};
    
    // Add the body to the world
    World.add(world, this.body);
  }
  
  draw() {
    // Draw the body by its vertices
    fill(100);
    let pos = this.body.position;
    let angle = this.body.angle;
    beginShape();
    for (var i = 0; i < this.body.vertices.length; i++) {
      vertex(this.body.vertices[i].x, this.body.vertices[i].y);
    }
    endShape();
  }

  // Event Listener
  on (event, callback) {
    if(!this.callbacks[event]) this.callbacks[event] = [];
    this.callbacks[event].push(callback)
  }

  // Event Emitter
  emit (event, data) {
    let cbs = this.callbacks[event]
    if(cbs){
      cbs.forEach(cb => cb(data))
    }
  }

  run() { }
}