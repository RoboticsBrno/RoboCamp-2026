# RTC
### Example project
=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Create project]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/rtc/rtc-example.tar.gz){.md-button .md-button--primary}
=== "VSCode extension"
    Otevřeme VSCode, v levém exploreru kliknema na extension `Jaculus` a tlačítko `Create Project`. Vybereme adresář, kde chceme mít projekt uložený a zadáme název projektu. Poté v menu vybereme možnost `Custom package URL` a zadáme toto URL: 
    
    `https://2026.robotickytabor.cz/moduly/rtc/rtc-example.tar.gz`.
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/rtc/rtc-example.tar.gz <PROJECT_NAME>
    ```
=== "Zip"
    Stáhneme si tento zip soubor, rozbalíme jej a otevřeme ve VSCode.
    
    [Zip soubor](https://2026.robotickytabor.cz/moduly/rtc/rtc-example.zip){.md-button .md-button--primary}

### Montáž
Pokud nemáte sestavené RTC, můžete si jej sestavit podle [návodu](https://pmod.robotikabrno.cz/RTC/manual/).

### Knihovna
RTC neboli Real Time Clock je modul, který umožňuje měřit čas. Modul má na sobě slot na baterii, tedy i po odpojení od napájení si modul pamatuje aktuální čas. Modul je připojen k Saturnu přes uŠup a komunikuje přes I2C. 

Knihovna `ds3231` umožňuje číst a nastavovat čas na modulu. Pro komunikaci s modulem je potřeba inicializovat I2C sběrnici pomocí knihovny `i2c`. Je potřeba nastavit správné piny pro SDA a SCL. 

Je potřeba nainstalovat knihovnu `ds3231`. Pro tento example navíc knihovnus `button`.

```ts
import { SaturnPins } from "saturn";
import { Button } from "button";
import { DS3231 } from "ds3231";
import { I2C1 } from "i2c";

const button = new Button(SaturnPins.BootBtn);

I2C1.setup({ sda: SaturnPins.uSupA.SDA, scl: SaturnPins.uSupA.SCL });
const rtc = new DS3231(I2C1);

setInterval(() => {
    const time = rtc.readTime();
    console.log(`Current date: ${time.year}-${time.month}-${time.date}`);
    console.log(`Current time: ${time.hours}:${time.minutes}:${time.seconds}`);
}, 1000);

button.on("click", () => {
  rtc.setTime({
    year: 2024,
    month: 6,
    date: 15,
    day: 6, 
    hours: 12,
    minutes: 0,
    seconds: 0
  })
});
```