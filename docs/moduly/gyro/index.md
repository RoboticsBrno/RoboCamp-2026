# Gyro

!!! danger "Našli jsme chyby, nepoužívat!!!"

Gyroskop měří úhel natočení v 3 osách. Umožňuje detekci otáčení, naklonění a pohybu robota.

## Vytvoření projektu

=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Vytvořit projekt]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/gyro/gyro-example.tar.gz){.md-button .md-button--primary}
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/gyro/gyro-example.tar.gz <PROJECT_NAME>
    ```

## Instalace knihoven

Do nového projektu nainstalujeme potřebné knihovny:

- `gyro`

## Použití

Gyroskop je připojen k PMODu na Saturnu. Můžete si jeho piny vyčíst z popisků na Saturnu, nebo z objektu `SaturnPins` z knihovny `saturn`, například `SaturnPins.Pmod1.Pin1`.

```ts
import { Gyro } from "gyro";
import { SaturnPins } from "saturn";

const gyro = new Gyro(SaturnPins.Pmod1.Pin1, SaturnPins.Pmod1.Pin2, SaturnPins.Pmod1.Pin3);

setInterval(() => {
    const data = gyro.read();
    console.log(`X: ${data.x}, Y: ${data.y}, Z: ${data.z}`);
}, 100);
```
