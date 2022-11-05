// Import some stuff from matter.js
const { Engine, World, Bodies, Vector, Collision, SAT, Common } = Matter;
const bd = Matter.Body;

// Configure Poly-decomp so that polygon-polygon collisions work
Common.setDecomp(decomp);

// Base game vars
let scene = "menu";
let level = 0;
let nextLevel = false;
let textFade = 255;

// Our world and engine
let world, engine, player;

// An array of all bodies
let bodies = [];

// What keys are currently being pressed down
let keys = [];

