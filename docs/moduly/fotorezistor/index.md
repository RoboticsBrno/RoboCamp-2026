# Fotorezistor
### Example project
=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Create project]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/fotorezistor/fotorezistor-example.tar.gz){.md-button .md-button--primary}
=== "VSCode extension"
    Otevřeme VSCode, v levém exploreru kliknema na extension `Jaculus` a tlačítko `Create Project`. Vybereme adresář, kde chceme mít projekt uložený a zadáme název projektu. Poté v menu vybereme možnost `Custom package URL` a zadáme toto URL: 
    
    `https://2026.robotickytabor.cz/moduly/fotorezistor/fotorezistor-example.tar.gz`.
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/fotorezistor/fotorezistor-example.tar.gz <PROJECT_NAME>
    ```
=== "Zip"
    Stáhneme si tento zip soubor, rozbalíme jej a otevřeme ve VSCode.
    
    [Zip soubor](https://2026.robotickytabor.cz/moduly/fotorezistor/fotorezistor-example.zip){.md-button .md-button--primary}

### Montáž
Pokud nemáte sestavený fotoresistor, můžete si jej sestavit podle [návodu](https://pmod.robotikabrno.cz/photoresistor/manual/).

### Použití
Fotorezistor detekuje úroveň světla a dává nám ji jako analogovou hodnotu na jednom z pinů PMODu. Jelikož je hodnota analogová, musíme použít takzvaný ADC (Analog to Digital Converter), který nám tuto analogovou hodnotu převede na digitální. Na Saturnu je ADC již zabudovaný, takže stačí použít knihovnu `adc`. 

Fotorezistor je připojen k PMODu, jeho piny tedy odpovídají pinům PMODu. Můžete si je buď vyčíst z popisků na Saturnu, nebo z objektu `SaturnPins` z knihovny `saturn`, například `SaturnPins.Pmod1.Pin1`.

```ts
import * as adc from 'adc';
import { SaturnPins } from "saturn"

adc.configure(SaturnPins.Pmod1.Pin1);

setInterval(() => {
  console.log(adc.read(SaturnPins.Pmod1.Pin1));
}, 50);
```