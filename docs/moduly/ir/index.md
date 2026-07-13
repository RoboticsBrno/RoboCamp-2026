# IR

IR komunikace umožňuje bezdrátově přenášet data pomocí infračerveného světla. Umožňuje například komunikaci mezi dvěma zařízeními na krátkou vzdálenost.

## Vytvoření projektu

=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Vytvořit projekt]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/ir/ir-example.tar.gz){.md-button .md-button--primary}
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/ir/ir-example.tar.gz <PROJECT_NAME>
    ```
## Instalace knihoven

Do nového projektu nainstalujeme potřebné knihovny:

- `utils`

## Použití

IR komunikace používá na Saturnu seriový port. Odesílání je doplněno o PWM modulátor na frekvenci 37 kHz, který přepíná infračervenou diodu. Příjem je připojen přímo k seriovému portu.

```ts
import { Serial1 } from "serial";
import { PWM } from "pwm";
import { SaturnPins } from "saturn";

const freq = 37000; // freqvence kterou přijímač očekává (neměnit)

// Nastavíme seriový port
Serial1.setup({
    tx: SaturnPins.Pmod1.Pin3,
    rx: SaturnPins.Pmod1.Pin1,
    baudRate: 1200, // rychlost jakou se data přenášejí (musí být stejná na obou komunikujících modulech)
});

// Zapneme generaci 37kHz signálu
let txModulator = new PWM({
    pin: SaturnPins.Pmod1.Pin4,
    frequency: freq,
    duty: 512
});


// Každou sekundu pošleme naší zprávu
setInterval(async () => {
    Serial1.write(utils.strToBytes("Ahoj z Saturnu"));
}, 1000);


// Čekáme až dostaneme data z modulu a vypíšeme
while (true) {
    let data = await Serial1.read();
    console.log("Přijato: " + utils.bytesToStr(data));
}
```
