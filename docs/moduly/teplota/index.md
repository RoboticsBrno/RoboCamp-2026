# Senzor teploty
### Example project
=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Create project]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/teplota/teplota-example.tar.gz){.md-button .md-button--primary}
=== "VSCode extension"
    Otevřeme VSCode, v levém exploreru kliknema na extension `Jaculus` a tlačítko `Create Project`. Vybereme adresář, kde chceme mít projekt uložený a zadáme název projektu. Poté v menu vybereme možnost `Custom package URL` a zadáme toto URL: 
    
    `https://2026.robotickytabor.cz/moduly/teplota/teplota-example.tar.gz`.
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/teplota/teplota-example.tar.gz <PROJECT_NAME>
    ```
=== "Zip"
    Stáhneme si tento zip soubor, rozbalíme jej a otevřeme ve VSCode.
    
    [Zip soubor](https://2026.robotickytabor.cz/moduly/teplota/teplota-example.zip){.md-button .md-button--primary}

### Montáž
Pokud nemáte sestavený senzor teploty, můžete si jej sestavit podle [návodu](https://pmod.robotikabrno.cz/thermometer/manual/).

### Knihovna
Tento senzor teploty pracuje přes protokol `OneWire`, pro připojení by tedy stačil jen jeden pin + napájení. Nicméně, pro pohodlnější práci je senzor připojen přes PMOD. Pin si můžete buď vyčíst z popisků na Saturnu, nebo z objektu `SaturnPins` z knihovny `saturn`, například `SaturnPins.Pmod1.Pin1`.

Jelikož komunikace se senzor je složitější a trvá delší dobu, práce s ním musí být asynchronní - `async` a `await`. Funkce `readTemperature()` je tedy asynchronní. Standardně ji budeme tedy používat v asynchronní funkci s `await`. Pokud ji použijeme v běžné funkci, vrátí nám `Promise`, ze kterého si musíme teplotu vyzvednout pomocí `then()`.

Je potřeba nainstalovat knihovnu `ds18b20`.

```ts
import { DS18B20 } from "ds18b20"
import { SaturnPins } from "saturn";

const thermo = new DS18B20(SaturnPins.Pmod1.Pin1);

setInterval(async () => {
  try {
    const temperature = await thermo.readTemperature();
    console.log(`Current temperature: ${temperature} °C`);
  } catch (error) {
    console.error("Error reading temperature:" + error);
  }
}, 1000);
```