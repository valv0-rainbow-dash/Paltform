# Configuring and Creating Blocks

## Properties
| name | type | description 
|-|-|-
| supports | Array | An array of objects in the format `{ x: Number, y: Number }` for all points that are touching the player
| t | String | The block's code
| angleCollision | null/Number | If the block is touching the player, the angle of the collision.  Otherwise, `null`

## Shapes
Notice when you go to `game/block.js` the `shapes` variable.  From within that, all shapes for blocks must be defined with point vertices.  For example, a rectangle has four points (top-right, top-left, bottom-right, bottom-left), and trapezoid/triangular pieces will be different.  By default, there is a square and four 45-degree triangles rotated for each angle.  To add a new shape, simply create a new item in the object and you can assign it to your blocks.

## blockTypes
The next thing you'll see is the `blockTypes` variable.  Each block is defined by a code and then its attributes.  Currently, the engine only has one attribute - `points`, but nobody's stopping you from adding more!

To create a new block type to use on the map, you _have to define it in `blockTypes`_ or an error will be thrown.

## Custom Drawing
To be able to draw a block in a custom style, make sure you go to the `draw()` method in the `Block` class and then you will be able to draw it there via p5 functions

## Event Handling
| event | description | argument(s)
|-|-|-
| collide | Fires once whenever the player touches the block | Single argument in the format `[blockObject, playerObject]`.  THe block object gets passed in on event fire as well as the player object.
| update | Fires once every frame | No arguments