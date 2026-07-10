# Lekce 5 - Vektorová grafika
V přechozích lekcích jsme viděli, jak ovládat jednotlivé pixely displeje. V této lekci si ukážeme jak vykreslovat složitější tvary a struktury.

## Jednoduché tvary

Ještě než začneme s vykreslováním jednoduchých tvarů, je potřeba si připravit kostru projektu:

```ts
import { Display } from "rphub75";
import { rgb } from "colors";
import * as colors from "colors";
import { Renderer, Format, Font, Texture } from "renderer";
import { Circle, Rectangle, Point, LineSegment, Collection } from "shapes";

const root = new Collection({ x: 0, y: 0, color: colors.white, z: 0 });

// Sem vepisujte vlastní kod

const display = new Display();
const renderer = new Renderer(display.width, display.height);
renderer.render(root, display.frame, true, Format.RGB_888);
display.show();
```

Nejdříve si vykreslíme jednoduchý čtverec:
```ts
const ctverec = new Rectangle({x: 10, y: 10, width: 10, height:20, color: colors.yellow})
root.add(ctverec)
```
Poté vykreslíme ještě vyplněný kruh:
```ts
const kruh = new Circle({x: 32, y: 32, radius: 5, color: colors.green, fill: true})
root.add(kruh)
```
!!! warning "Každý tvar musíme přidat do kolekce, kterou poté renderer vykresluje, nebo do nějaké její podkolekce" 

### Rotace
Vyzkoušíme si ještě rotace. Před prováděním rotací je dobré nastavit si bod (pivot), kolem kterého se bude tvar otáčet

```ts
ctverec.setPivot(0,0)
ctverec.rotate(45)
```
Celý dosavadní kód by měl vypadat nějak takto:
```ts
import { Display } from "rphub75";
import { rgb } from "colors";
import * as colors from "colors";
import { Renderer, Format, Font, Texture } from "renderer";
import { Circle, Rectangle, Point, LineSegment, Collection } from "shapes";

const root = new Collection({ x: 0, y: 0, color: colors.white, z: 0 });

const ctverec = new Rectangle({x: 10, y: 10, width: 10, height:20, color: colors.yellow})
root.add(ctverec)
ctverec.setPivot(0, 0)
ctverec.rotate(45)

const kruh = new Circle({x: 32, y: 32, radius: 5, color: colors.green, fill: true})
root.add(kruh)

const display = new Display();
const renderer = new Renderer(display.width, display.height);
renderer.render(root, display.frame, true, Format.RGB_888);
display.show();
```
!!! note "Všiměte si, že nastavení pivota na souřadnice 0, 0 vede k rotaci okolo rohu čtverce, ne okolo pixelu se souřadnicemi 0, 0."


## Kolekce


## Postup vykreslování