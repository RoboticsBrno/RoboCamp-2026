# 5ti-směrný spínač (5-way switch)
### Example project
=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Vytvořit projekt]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/5way/5way-example.tar.gz){.md-button .md-button--primary}
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/5way/5way-example.tar.gz <PROJECT_NAME>
    ```

### Zapojení

!!! warning "Upozornění"
    Tento modul se nesmí zapojit přímo, jeho konektor není kompatibilní s PMOD!

Každé tlačítko je vyvedeno na jeho konektoru, pro zapojení použijte prodlužovací drátky. Zapojte `GND` do GND a pak každý z pinů (`F`,`B`,`L`,`R`,`M`) zapojte do vstupů PMODů. Tento modul má více výstupů než jeden PMOD má dostupný, proto je potřeba jeden z pinů zapojit do ještě dalšího PMODu.
S tlačítky pracujeme stejně jako s tlačítkem na desce - knihovna `button`.

### Knihovna
5ti-směrný spínač je modul, který se skládá z pěti tlačítek (nahoru, dolů, vlevo, vpravo a uprostřed). Typicky se používá pro ovládání, pohyb nebo navigaci v menu. 

5ti-směrný spínač je připojen k PMODu pomocí prodlužovacích drátků. Můžete si piny buď vyčíst z popisků na Saturnu, nebo z objektu `SaturnPins` z knihovny `saturn`, například `SaturnPins.Pmod3.Pin1` (ideální je PMOD3, protože potžebujeme 5 pinů).

Je potřeba nainstalovat knihovnu `button`.

```ts
import { Button } from "button";
import { SaturnPins } from "saturn"

const btnFront = new Button(SaturnPins.Pmod3.Pin1);
const btnBack = new Button(SaturnPins.Pmod3.Pin2);
const btnLeft = new Button(SaturnPins.Pmod3.Pin3);
const btnRight = new Button(SaturnPins.Pmod3.Pin4);
const btnMiddle = new Button(SaturnPins.Pmod3.Pin5);

btnFront.on("click", () => {
    console.log("Front!");
});
btnBack.on("click", () => {
    console.log("Back!");
});
btnLeft.on("click", () => {
    console.log("Left!");
});
btnRight.on("click", () => {
    console.log("Right!");
});
btnMiddle.on("click", () => {
    console.log("Click!");
});
```