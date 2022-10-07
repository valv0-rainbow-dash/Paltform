# Creating Levels

To create a level, go to `game/levels.js`.  Notice that there is one variable in this file, `levels`.  To get started, copy and paste an existing level into the array.

Creating a new level is particularly simple.  Just create an array bitmap with the following characters and optionally assign a message for each level.

| code | description |
|-|-|
| `@` | The player's spawn point
| `0` | A square block
| `<` | A slanted block (NorthWest slant)
| `<` | A slanted block (NorthEast slant)
| `\` | A slanted block (SouthWest slant)
| `/` | A slanted block (SouthEast slant)
| ` ` | An empty space

**Note:** Javascript character escaping still applies, so `\` becomes `\\` in a javascript string.

These are the current existing blocks, read `docs/blocks.md` on how to create and customize blocks.