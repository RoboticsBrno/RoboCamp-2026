# Joystick

Joystick je zařízení, které umožňuje ovládat něco pohybem v ploše. Jedná se o dva potenciometry (osa X a Y) a tlačítko. Umožňuje například ovládání pohybu robota nebo navigaci v menu.

## Vytvoření projektu

=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Vytvořit projekt]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/joystick/joystick-example.tar.gz){.md-button .md-button--primary}
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/joystick/joystick-example.tar.gz <PROJECT_NAME>
    ```

## Instalace knihoven

Do nového projektu nainstalujeme potřebné knihovny:

- `button`

## Použití

Joystick je připojen k PMODu na Saturnu. Osa X je na pinu 1, osa Y na pinu 2 a tlačítko na pinu 4. Piny můžete vyčíst z objektu `SaturnPins` z knihovny `saturn`.

```ts
import * as adc from "adc";
import { SaturnPins } from "saturn";

adc.configure(SaturnPins.Pmod1.Pin1);
adc.configure(SaturnPins.Pmod1.Pin2);

setInterval(() => {
    const x = adc.read(SaturnPins.Pmod1.Pin1);
    const y = adc.read(SaturnPins.Pmod1.Pin2);
    const sx = Math.map(x, 0, 1023, 0, 63);
    const sy = Math.map(y, 0, 1023, 0, 63);
    console.log(`X: ${sx}, Y: ${sy}`);
}, 50);
```
