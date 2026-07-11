# Rotační enkodér
### Example project
=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Create project]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/enkoder/enkoder-example.tar.gz){.md-button .md-button--primary}
=== "VSCode extension"
    Otevřeme VSCode, v levém exploreru kliknema na extension `Jaculus` a tlačítko `Create Project`. Vybereme adresář, kde chceme mít projekt uložený a zadáme název projektu. Poté v menu vybereme možnost `Custom package URL` a zadáme toto URL: 
    
    `https://2026.robotickytabor.cz/moduly/enkoder/enkoder-example.tar.gz`.
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/enkoder/enkoder-example.tar.gz <PROJECT_NAME>
    ```
=== "Zip"
    Stáhneme si tento zip soubor, rozbalíme jej a otevřeme ve VSCode.
    
    [Zip soubor](https://2026.robotickytabor.cz/moduly/enkoder/enkoder-example.zip){.md-button .md-button--primary}

### Montáž
Pokud nemáte sestavený rotační enkodér, můžete si jej sestavit podle [návodu](https://pmod.robotikabrno.cz/r-encoder/manual/).

### Knihovna
Rotační enkodér umožňuje čtení otáčení a stisku tlačítka. Narozdíl od klasického potenciometru nemá žádnou pevnou polohu, ale pouze relativní změnu. Nemá tedy omezený rozsah otáčení. Sledování polohy ze změn za nás řeší knihovna, která počítá změny a z nich odvozuje aktuální polohu.

Osa enkodéru je zároveň tlačítko, které se stiskne při zatlačení na osu. Tlačítko je možné číst stejně jako běžné tlačítko na desce nebo DPadu.

Rotační enkodér je připojen k PMODu, jeho piny tedy odpovídají pinům PMODu. Můžete si je buď vyčíst z popisků na Saturnu, nebo z objektu `SaturnPins` z knihovny `saturn`, například `SaturnPins.Pmod1.Pin1`.

Je potřeba nainstalovat knihovny `r-encoder` a `button`.

```ts
import { RotaryEncoder } from "r-encoder";
import { Button } from "button";
import { SaturnPins } from "saturn";

const encoder = new RotaryEncoder(SaturnPins.Pmod1.Pin1, SaturnPins.Pmod1.Pin2);
const encoderBtn = new Button(SaturnPins.Pmod1.Pin3);

setInterval(() => {
    console.log("pos: " + encoder.read());
}, 5);

encoderBtn.on("click", () => {
    console.log("Clearing encoder value");
    encoder.clear();
});
```