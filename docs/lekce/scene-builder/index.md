# Builder scén

Builder scén je grafický editor pro navrhování obrázků na 64×64 LED displeji Saturnu. Nakreslete tvary (obdélníky, kruhy, úsečky, body i mnohoúhelníky), poskládejte je do scény pomocí skupin a vrstev a nechte si vygenerovat hotový TypeScript kód, který stačí vložit do vlastního projektu.

```ts
import { createSaturn } from "saturn";
import * as colors from "colors";
import { Renderer, Format, Font, Texture } from "renderer";
import { Circle, Rectangle, Point, LineSegment, Collection } from "shapes";

const saturn = createSaturn();
const display = saturn.display;

// zde dej svoji vygenerovanou funkci
function generateScene() { 
    ...
	return scene;
}

const root = generateScene()

renderer.render(root, display.frame, true, Format.RGB_888);
display.show();
```

[Builder](builder.html){ .md-button }
