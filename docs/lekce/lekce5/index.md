# Lekce 5 - Vektorová grafika

V přechozích lekcích jsme viděli, jak ovládat jednotlivé pixely displeje. V této lekci si ukážeme jak vykreslovat složitější tvary a struktury.

## Vytvoření projektu

=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Vytvořit projekt]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/lekce/baseExample.tar.gz){.md-button .md-button--primary}
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
        
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/lekce/baseExample.tar.gz <PROJECT_NAME>
    ```

## Instalace knihoven

Do nového projektu nepotřebujeme další knihovny

## Jednoduché tvary

Ještě než začneme s vykreslováním jednoduchých tvarů, je potřeba si připravit kostru projektu:

=== "Bločky"
    ![](./assets/stub.png)
=== "TypeScript"
    ```ts
    import { createSaturn, SaturnPins } from "saturn";
    import { GameLoop } from "game-loop"
    import * as colors from "colors";
    import { Circle, Rectangle} from "shapes";

    const saturn = createSaturn()
    const game_loop = new GameLoop(saturn.display)
    
    // Sem pište svůj kód
    ```

Nejdříve si vykreslíme jednoduchý prázdný čtverec a vyplněný kruh:

=== "Bločky"
    ![](./assets/add_shapes.png)
=== "TypeScript"
    ```ts
    const obdelnik = new Rectangle({x: 10, y: 10, width: 10, height:20, color: colors.yellow})
    game_loop.addShape(obdelnik)
    const kruh = new Circle({x: 32, y: 32, radius: 5, color: colors.green, fill: true})
    game_loop.addShape(kruh)
    ```

!!! warning "Každý tvar musíme přidat do game loopu aby se nám zobrazil." 

### Rotace
Vyzkoušíme si ještě rotace. Před prováděním rotací je dobré nastavit si bod (pivot), kolem kterého se bude tvar otáčet

=== "Bločky"
    ![](./assets/rotate_pivot.png)
=== "TypeScript"
    ```ts
    obdelnik.setPivot(0,0)
    obdelnik.rotate(45)
    ```
Celý dosavadní kód by měl vypadat nějak takto:
```ts
import { createSaturn, SaturnPins } from "saturn";
import { GameLoop } from "game-loop"
import * as colors from "colors";
import { Circle, Rectangle} from "shapes";

const saturn = createSaturn()
const game_loop = new GameLoop(saturn.display)

const obdelnik = new Rectangle({x: 10, y: 10, width: 10, height:20, color: colors.yellow})
game_loop.addShape(obdelnik)
const kruh = new Circle({x: 32, y: 32, radius: 5, color: colors.green, fill: true})
game_loop.addShape(kruh)

obdelnik.setPivot(0, 0)
obdelnik.rotate(45)
```
!!! note "Všiměte si, že nastavení pivotu na souřadnice 0, 0 vede k rotaci okolo rohu čtverce, ne okolo pixelu se souřadnicemi 0, 0. Jak bychom to museli udělat, kdybychom chtěli více tvarů otáčet kolem jednoho středu?"

Abyste nemuseli vlastnoručně psát kód pro každý tvar. Připravili jsme vám Návrhář.

[Návrhář - dokumentace](../scene-builder/index.md){.md-button}

## Zadání A -- Osmiúhelník
Podívejte se co všechno vám kategorie bločků pro vykreslování geometrických tvarů nabízí. Najděte způsob jak osmiúhelník na obrazovku.

??? note "Řešení"
    ```ts
    import { createSaturn, SaturnPins } from "saturn";
    import { GameLoop } from "game-loop"
    import * as colors from "colors";
    import {RegularPolygon} from "shapes";

    const saturn = createSaturn()
    const game_loop = new GameLoop(saturn.display)

    const osmiuhelnik = new RegularPolygon({x: 32, y: 32, sides: 8, radius: 20, color:colors.pink})
    game_loop.addShape(osmiuhelnik)
    ```

## Zadání B -- Sněhulák
Použijte tři vyplněné bílé kruhy vhodných velikostí, abyste nakreslili siluetu sněhuláka

??? note "Řešení"
    ```ts
    import { createSaturn, SaturnPins } from "saturn";
    import { GameLoop } from "game-loop"
    import * as colors from "colors";
    import { Circle, Rectangle} from "shapes";

    const saturn = createSaturn()
    const game_loop = new GameLoop(saturn.display)

    const hlava = new Circle({x: 32, y: 50, radius: 10, color: colors.white, fill:true})
    game_loop.addShape(hlava)
    const telo = new Circle({x: 32, y: 32, radius: 10, color: colors.white, fill:true})
    game_loop.addShape(telo)
    const spodek = new Circle({x:32, y: 15, radius:10, color: colors.white, fill: true})
    game_loop.addShape(spodek)
    ```

## Výstupní úloha V1
Vhodným složením trojúhelníku a obdélníku nakreslete domeček.
