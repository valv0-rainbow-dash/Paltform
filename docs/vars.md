# Understanding the Base Variables

All the base variables are under `core.js`.  On the first line, we see all the import from Matter.js.  None of these are really of any concern and most are built into the classes in the game.  If you would like to learn more about matter.js bodies or how it works, check out the [docs](https://brm.io/matter-js/docs/).

Here is a table of the base variables for the game:

| variable | type | description
|-|-|-
| scene | String | The current scene
| level | Number | The current level
| nextLevel | Boolean | Whether to switch to the next level.  Set `nextLevel` to true and the next level will automatically set.
| textFade | Number | The opacity of the message text at the beginning of each level
| world | Object | Our Matter.js main world instance
| engine | Object | Our Matter.js engine instance
| player | Object | Our main player object
| bodies | Array | All matter.js bodies that are being rendered
| keys | Array | All current keys being pressed down on the keyboard