# Understanding Matter.js Bodies

The player, blocks, and pretty much anything that is affected by physics in the platformer engine are all extended instances of the `Body` class, which is located in `game/body.js`.

Each individual body has an event emitter and handler, which are the `on` and `emit` methods.  Any time you want to fire an event, use `body.emit("event", arg)` and handle it with `body.on("event", argData => { ... })`

The other methods that come with the body class are `draw()` and `run()`, where `draw()` displays the body on the screen and `run()` fires every frame.

## Properties

| property | type | description
|-|-|-
| body | Object | The matter.js body object
| type | String | The body type (e.g. `"player"`, `"block"`. etc)
| dead | Boolean | Whether the body should be removed (setting to true will splice the instance from all bodies)
| callbacks | Object | All event data being passed

---

If you would like to get a better understanding of how matter.js bodies work, be sure to check the official [documentation](https://brm.io/matter-js/docs/classes/Body.html).
