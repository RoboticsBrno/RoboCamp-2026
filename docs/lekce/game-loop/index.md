# Herní smyčka

Abychom nemuseli každý objekt ve scéně spravovat ručně a zároveň mohli jednoduše sledovat interakce mezi nimi, můžeme využít knihovnu `game-loop`. Tu lze nainstalovat stejně jako ostatní knihovny. Je také součástí šablony `template-jaculus-saturn`.

Knihovna nabízí třídu `GameLoop`, která se stará o správu objektů ve scéně a jejich vykreslování. Při vytvoření instance třídy `GameLoop` je potřeba předat referenci na displej, na kterém se bude scéna vykreslovat -- v našem případě je to `saturn.display`.

Objekty ve scéně pak spravují metody `addShape` a `removeShape`. Vykreslování pak probíhá automaticky při každém "ticku" smyčky. V každém "ticku" se také kontrolují kolize mezi objekty a na základě nich se vyvolávají události.

#### Ukázka šablony

```ts
import { GameLoop } from "game-loop";
import { createSaturn } from "saturn";
import { LineSegment } from "shapes";
import * as colors from "colors";


let saturn = createSaturn();
let loop = new GameLoop(saturn.display);

let line = new LineSegment({
    x: 32,
    y: 32,
    x2: 48,
    y2: 48,
    color: colors.red,
});
loop.addShape(line);

loop.on("tick", (delta) => {
    line.rotate(5);
});
```


#### Ukázka detekce kolizí

Následující ukázka demonstruje detekci kolizí mezi dvěma kružnicemi. Jedna z nich se pohybuje a při kolizi s druhou se vyvolá událost `collision`.

```ts
...

let circleA = new Circle({
    x: 32,
    y: 32,
    radius: 8,
    color: colors.red,
});
loop.addShape(circleA);
let circleB = new Circle({
    x: 48,
    y: 48,
    radius: 8,
    color: colors.blue,
});
loop.addShape(circleB);

let dx = 1;
loop.on("tick", (delta) => {
    circleB.move(dx, 0);
    if (circleB.x > 64 || circleB.x < 0) {
        dx *= -1;
    }
});

loop.on("collision", (shapeA, shapeB) => {
    console.log("Kolize mezi tvary:", shapeA, shapeB);
});
```
