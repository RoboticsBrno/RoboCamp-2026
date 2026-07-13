# Builder scén

Builder scén je grafický editor pro navrhování obrázků na 64×64 LED displeji Saturnu. Nakreslete tvary (obdélníky, kruhy, úsečky, body i mnohoúhelníky), poskládejte je do scény pomocí skupin a vrstev a nechte si vygenerovat hotový TypeScript kód, který stačí vložit do vlastního projektu.

```ts
import { createSaturn, SaturnPins } from "saturn";
import { GameLoop } from "game-loop";

const sat = createSaturn()
const gl = new GameLoop(sat.display)

function generateScene() {
	
 // Tato funkce bude výstupem generátoru scén

}

const scene = generateScene()

gl.addShape(scene)
```

[Builder](builder.html){ .md-button }
