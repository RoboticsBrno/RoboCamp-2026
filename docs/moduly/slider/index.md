# Slider (Posuvný potenciometr) 
### Example project
=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Vytvořit projekt]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/slider/slider-example.tar.gz){.md-button .md-button--primary}
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/slider/slider-example.tar.gz <PROJECT_NAME>
    ```

### Zapojení
Tento modul nemá PMOD konektor, musíte pomocí prodlužovacích drátků jej zapojit sami.
Slider má dva konektory které ale mají stejný výstup, takže jakýkoliv z ních se dá využít, vyberte podle toho jaký bude lehčeji zapojit. Zapojte `VCC` do VCC, `GND` do GND a `OTB`/`OTA` do PMOD pinů 1 nebo 2 (u PMOD 3 jsou také použitelné piny 5 a 6).


### Použití
Posuvný potenciometr vydává analogovou hodnotu podle pozice slideru, je velmi podobný joysticku akorát jen v jedné ose. Jelikož je hodnota analogová, musíme použít takzvaný ADC (Analog to Digital Converter), který nám tuto analogovou hodnotu převede na digitální. Na Saturnu je ADC již zabudovaný, takže stačí použít knihovnu `adc`. 

Můžete si je buď vyčíst z popisků na Saturnu, nebo z objektu `SaturnPins` z knihovny `saturn`, například `SaturnPins.Pmod1.Pin1`.

```ts
import * as adc from 'adc';
import { SaturnPins } from "saturn"

adc.configure(SaturnPins.Pmod1.Pin1);

setInterval(() => {
  console.log(adc.read(SaturnPins.Pmod1.Pin1));
}, 50);
```