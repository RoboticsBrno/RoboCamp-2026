# DPad
### Example project
=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Vytvořit projekt]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/dpad/dpad-example.tar.gz){.md-button .md-button--primary}
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/dpad/dpad-example.tar.gz <PROJECT_NAME>
    ```

### Montáž
Pokud nemáte sestavený DPad, můžete si jej sestavit podle [návodu](https://pmod.robotikabrno.cz/DPad/manual/).

### Knihovna
DPad je velmi jednoduchý modul, který se skládá ze čtyř tlačítek (nahoru, dolů, vlevo, vpravo). Typicky se používá pro ovládání, pohyb nebo navigaci v menu. Každé tlačítko je připojeno k určitému pinu na PMOD. S tlačítky pracujeme stejně jako s tlačítkem na desce - knihovna `button`.

DPad je připojen k PMODu, jeho piny tedy odpovídají pinům PMODu. Můžete si je buď vyčíst z popisků na Saturnu, nebo z objektu `SaturnPins` z knihovny `saturn`, například `SaturnPins.Pmod1.Pin1`.

Je potřeba nainstalovat:

- `button`

```ts
import { Button } from "button";
import { SaturnPins } from "saturn"

const btn = new Button(SaturnPins.Pmod1.Pin1);

btn.on("click", () => {
    console.log("Button clicked!");
});
```