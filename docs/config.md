# Configure the world

Open up the `game` folder and navigate to `config.js`.  You can see some options in there such as `player` and `world`.  From here is where you will control base mechanics such as physics, the player, and more.

## config.world

| option | type | description | default value
|-|-|-|-
| gravity | Number | The amount of gravity pulling down on objects.  The higher the value, the more force it pulls.  For example, a lunar-based platformer should have less gravity | `2.25`
| maxYVel | Number | The maximum amount of Y-Velocity a body can have effecting it. | `25`
| blockSize | Number | The default size (pixels) of a block | `50`
| camera | Boolean | Whether or not to use a camera to follow the player | `true`
| cameraFriction | Number | An incremental value of camera smoothness - 1 is very un-smooth while 50 is overkill smooth | `5`

## config.player

| option | type | description | default value
|-|-|-|-
| width | Number | The width (in pixels) of the player | `40`
| height | Number | The height (in pixels) of the player | `80`
| jumpForce | Number | The thrust power of a jump or wall-jump | `0.15`
| speed | Number | The maximum x-velocity the player can have when moving | `7`
| acceleration | Number | The speed at which the player's velocity increases when moving | `0.5`
| decceleration | Number | The increment at which the player slows down when not moving | `5`
| dashTime | Number | How many frames before the player can perform a dash | `50`
| actions | Array | What actions the player is allowed to perform (`wall jump`, `dash`, etc) | `["wall jump", "dash"]`
