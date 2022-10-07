# Customizing the Player

You can easily customize the player to your liking by filling out the options in `game/config.js` and in `game/player.js`.  

## Properties

| property | type | description
|-|-|-
| speed | Number | current X-Velocity
| supports | Array | An array of points in the format `{ x: Number, y: Number }` for all points of bodies touching the player
| sensors | Object | An object in the format `{ bottom: Boolean, left: Boolean, right: Boolean }` for which sides of the player are being touched
| dashTimer | Number | How many frames need to pass before the player can dash again
| canDash | Boolean | Ensures that the player can't dash twice in the air
| angleCollisions | Boolean | The angles of points where the player is hitting any bodies
| died | Boolean | If the player has died.  If you want to programatically kill the player, set `player.died` to `true`

## Event Handling

If you go to `game/player.js`, you will notice, upon scrolling near the bottom, that there is a function `configPlayerEvents()` with some event listeners and handlers.  Within here, you can control and add custom behaviors to the player such as changing its properties, sprite, or simply logging events for debugging.

| event name | description | argument(s)
|-|-|-|
| `collide` | This event gets fired when the player touches a block | `arguments[0]` - an array of angles at which bodies touch the player
| `dash` | This event fires whenever the player holds the SHIFT key to dash | `arguments[0]` - the player object
| `jump.up` | Whenever the player jumps (not a wall-jump) | `arguments[0]` - The player object
| `jump.left` | Whenever the player jumps off of a left wall by executing a wall-jump | `arguments[0]` - the player object
| `jump.right` | Whenever the player jumps off of a right wall by executing a wall-jump | `arguments[0]` - the player object
| `move.left` | Fires every frame when the player is moving left | `arguments[0]` - The player object
| `move.right` | Fires every frame when the player is moving right | `arguments[0]` - The player object
| `update` | Fires every frame | No arguments

## Draw the player

Open the `Player` class and go to the `draw()` method.  From within there, you can draw the player via p5 functions and make it to your liking.

## Q & A

**How do I get the player's position (x and y)?** - Use `player.body.position.x` and `player.body.position.y`.  All properties for the player's position and such are derived and inherited from [Matter.Body](https://brm.io/matter-js/docs/classes/Body.html)

**The player's position coordinates are wrong, how do I fix this?** - The player is aligned by its center of mass (matter.js body).  You can get the player's bounding box by using `player.body.bounds`.

