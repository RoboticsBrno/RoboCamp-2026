# Lekce 2 - RGB LED + tlačítko + události



=== "Bločky"
    V této lekci začneme se zajímavějšími programy.

    Ukážeme si ovládání RGB LED umístěné na Saturnu a práci s událostmi řízenými tlačítkem nebo časem.

    !!! note "Poznámka"
        V lekci 1 jsme se naučili, jak vytvořit nový projekt. Pokud nevíte, jak na to, podívejte se do lekce 1.

    ## Zadání A
    Nejprve si ověříme znalosti z minulé lekce. Zkusíme blikat RGB LED na Saturnu (pin 48). Na začátku tohoto úkolu si otevřeme nový prázdný projekt. Můžete se inspirovat projektem z minulé lekce.

    ??? tip "Řešení"
        ![blockSolutionA](./assets/blocksSolutionA.png)

    ## Co je to událost v programování?
    Událost je situace, kterou program rozpozná (například stisknutí nebo puštění tlačítka, uplynutí určitého času). Po zaznamenání události se vykoná kód, který je k této události přiřazen. Událostí může být například stisknutí tlačítka nebo uplynutí určitého času. 

    <!--TODO change all GPIO to buttons   -->
    ### Tlačítko
    Události řízené stiskem tlačítka můžeme ovládat pomocí bločků z podkategorie `Tlačítko` z kategorie `Periferie`.

    Tlačítko si nejprve musíme vytvořit bločkem `vytvořit tlačítko`. Políčko `limit dvojkliku` určuje, jak blízko musí být dvě kliknutí k sobě, aby byly považovány za dvojklik. 
    ![blocksCreateButton](./assets/blocksCreateButton.png)

    Na událost na tlačítku pak můžeme navázat blok kódu pomocí bloků `při kliknutí` a `při stisknutí/puštění/dvojití kliknutí`. Událost kliknutí nastane při stisknutí i puštění tlačítka, událost stisknutí při stisknutí tlačítka, událost puštění při puštění tlačítka a událost dvojitého kliknutí při dvojím kliknutí na tlačítko v daném časovém limitu. Bloček `při kliknutí` nám navíc dáva informaci o délce stisknutí.
    ![blocksOnClick](./assets/blocksOnClick.png)

    ## Zadání B
    <!-- TODO change pins to use lib -->
    Pomocí událostí rozsvítíme při stisknutí tlačítka LEDku na Saturnu a při puštění ji zhasneme. Tlačítko je na pinu `0`, LEDka na pinu `48`. Je důležité nezapomenout nastavit na začátku tlačítko a LEDku jako v předchozích úkolech.

    ??? tip "Řešení"
        ![blockSolutionB](./assets/blocksSolutionB.png)

    ### Časové události
    Události řízene časem můžeme ovládat pomocí bločků z kategorie `Základní`. Jsou zde 2 typy událostí: `Intervaly` a `Časovače`. 

    #### Interval    
    Událost `Intervaly` nám umožní opakovaně spouštět kód každých `X` milisekund. Tento kód bude každou vteřinu vypisovat zprávu do konzole. Všimněme si, že čas se udává v milisekundách, takže 1000 ms je 1 sekunda.
    ![setInterval](./assets/blocksSetInterval.png)

    Interval běží, dokud ho neukončíme pomocí bloku `zrušit interval`.
    ![clearInterval](./assets/blocksClearInterval.png)

    #### Časovač
    Událost `Časovač` nám umožní spustit kód po uplynutí určitého času.
    ![setTimeout](./assets/blocksSetTimeout.png)

    Časovač běží jen jednou, po uplynutí zadaného času. Pokud chceme časovač zastavit, můžeme použít blok `zrušit časovač`.
    ![clearTimeout](./assets/blocksClearTimeout.png)

    ## Zadání C
    <!-- TODO update to use isPressed from Button lib -->
    Desetkrát za sekundu vypíšeme stav zmáčknutí tlačítka (0 nebo 1). Stav daného tlačítka získáme pomocí bloku `přečti digitální hodnotu z pinu` z kategorie `GPIO`. Opakování dosáhneme pomocí `Intervalů`, a informaci vypíšeme pomocí bloku `konzole`. Všimněme si, že blok na čtení digitální hodnoty má narozdíl od ostatních bloků kulatý tvar, tedy se dá vložit do kulatých míst v jiných blocích. Můžeme ho tedy vložit do bloku `konzole`. Pokud je tlačítko stisknuté, blok pro čtení nám dá `0`, pokud stisknuté není, dá nám `1`.

    ??? tip "Řešení"
        ![blockSolutionC](./assets/blocksSolutionC.png)

    ## Výstupní úkol V1 - Pozdrav
    Při stisknutí tlačítka vypíšeme pozdrav.

    ## Výstupní úkol V2 - Změna barvy
    Při stisknutí tlačítka rozsvítíme LED na Saturnu jednou barvou a při puštění barvu změníme na jinou.


=== "TypeScript"
    V této lekci začneme se zajímavějšími programy.

    Ukážeme si ovládání RGB LED umístěné na Saturnu a práci s událostmi řízenými tlačítkem nebo časem.

    !!! note "Poznámka"
        V lekci 1 jsme se naučili, jak vytvořit nový projekt. Pokud nevíte, jak na to, podívejte se do lekce 1.

    <!-- TODO update to use PINS library -->
    === "Odkaz"
        Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

        [Create project]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/lekce/baseExample.tar.gz){.md-button .md-button--primary}
    === "VSCode extension"
        Otevřeme VSCode, v levém exploreru kliknema na extension `Jaculus` a tlačítko `Create Project`. Vybereme adresář, kde chceme mít projekt uložený a zadáme název projektu. Poté v menu vybereme možnost `Custom package URL` a zadáme toto URL: 
        
        `https://2026.robotickytabor.cz/lekce/baseExample.tar.gz`.
    === "Command line"
        Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
        
        ```bash
        jac project-create --package https://2026.robotickytabor.cz/lekce/baseExample.tar.gz <PROJECT_NAME>
        ```
    === "Zip"
        Stáhneme si tento zip soubor, rozbalíme jej a otevřeme ve VSCode.
        
        [Zip soubor](https://2026.robotickytabor.cz/lekce/baseExample.zip){.md-button .md-button--primary}
    
    ## Zadání A

    Nejprve si ověříme znalosti z minulé lekce. Zkusíme blikat RGB LED na Saturnu (pin 48). Na začátku tohoto úkolu si otevřeme nový prázdný projekt. Můžete se inspirovat projektem z minulé lekce.

    <!-- TODO propably use gameloop shit? -->
    ??? tip "Řešení"
    
        ```ts
        import * as basic from "basic";
        import { SmartLed, LED_WS2812B } from "smartled";
        import * as colors from "colors";

        const led = new SmartLed(48, 1, LED_WS2812B);

        basic.forever(async () => {
            led.set(0, colors.red);
            led.show();
            await sleep(250);
            led.set(0, colors.off);
            led.show();
            await sleep(250);
        });
        ```

    ## Co je to událost v programování?
    Událost je situace, kterou program rozpozná (například stisknutí nebo puštění tlačítka, uplynutí určitého času). Po zaznamenání události se vykoná kód, který je k této události přiřazen. Událostí může být například stisknutí tlačítka nebo uplynutí určitého času. 

    ### Tlačítko
    Události řízené stiskem tlačítka můžeme ovládat příkazy ze knihovny `button`.
    ```ts
    import { Button } from "button";
    ```
    Nejprve musíme tlačítko vytvořit pomocí příkazu `const button = new Button(PIN)`, kde `PIN` je číslo pinu.
    ```ts
    const buttonA = new Button(0)
    ```

    Poté si můžeme připojit k dané události blok kódu pomocí příkazu `button.on(EVENT, () => {...})`. Argument `EVENT` může být hodnota `"press"`, `"release"`, `"click"` a `"doubleClick"`. Událost `"press"` nastane při stisknutí tlačítka, `"release"` při puštění tlačítka, `"click"` při jednom stisknutí a `"doubleClick"` při dvojitém stisknutí tlačítka. Argument `() => {...}` je kód, který se vykoná při dané události.
    ```ts
    buttonA.on("press", () => {
        console.log("Button pressed");
    });

    buttonA.on("release", () => {
        console.log("Button released");
    });

    buttonA.on("click", () => {
        console.log("Button clicked");
    });

    buttonA.on("doubleClick", () => {
        console.log("Button double clicked");
    });
    ```

    Když vše spojíme dohromady, můžeme při stisknutí tlačítka vypisovat zprávy do konzole.
    ```ts
    import { Button } from "button";

    const buttonA = new Button(0);

    buttonA.on("press", () => {
        console.log("Button pressed");
    });

    buttonA.on("release", () => {
        console.log("Button released");
    });

    buttonA.on("click", () => {
        console.log("Button clicked");
    });

    buttonA.on("doubleClick", () => {
        console.log("Button double clicked");
    });
    ```

    ## LEDka pořádně

    Na desce Saturn je pouze jedna LEDka, se kterou budeme pracovat (pin 48). Pro práci s ní musíme nejprve importovat knihovnu.
    ```ts
    import { SmartLed, LED_WS2812B } from "smartled";
    ```

    Pak musíme LEDku vytvořit pomocí příkazu `const led = new SmartLed(PIN, COUNT, TYPE)`, kde `PIN` je číslo pinu, `COUNT` je počet LEDek a `TYPE` je typ LEDky. LEDka je připojena na `PIN` 48. Jelikož máme pouze jednu ledku, `COUNT` bude 1. Typ LEDky je `LED_WS2812B`, proto ho spolu s `SmarLed` importujeme.
    ```ts
    const led = new SmartLed(48, 1, LED_WS2812B);
    ```

    Pak už můžeme s LEDkou pracovat. K tomu nám slouží příkazy `led.set(INDEX, COLOR)` a `led.show()`. Příkaz `led.set(INDEX, COLOR)` nastaví barvu LEDky na daném indexu. Jelikož máme pouze jednu LEDku, `INDEX` bude 0. Barvu můžeme nastavit pomocí knihovny `colors`, kterou musíme také importovat. Příkaz `led.show()` zobrazí nastavenou barvu na LEDce. 
    ```ts
    import { SmartLed, LED_WS2812B } from "smartled";
    import * as colors from "colors";

    const led = new SmartLed(48, 1, LED_WS2812B);

    led.set(0, colors.green);
    led.show();
    ```

    !!! warning "Po každém nastavení barvy je potřeba zavolat příkaz `led.show()`, jinak se barva nezobrazí."

    ## Zadání B
    Pomocí událostí rozsvítíme při stisknutí tlačítka LEDku na Saturnu a při puštění ji zhasneme. Tlačítko je na pinu `0`, LEDka na pinu `48`. Je důležité nezapomenout nastavit na začátku tlačítko a LEDku jako v předchozích úkolech.

    ??? tip "Řešení"
        ```ts
        import { Button } from "button";
        import { SmartLed, LED_WS2812B } from "smartled";
        import * as colors from "colors";

        const buttonA = new Button(0);
        const led = new SmartLed(48, 1, LED_WS2812B);

        buttonA.on("press", () => {
            led.set(0, colors.red)
            led.show()
        });

        buttonA.on("release", () => {
            led.set(0, colors.off);
            led.show();
        });
        ```

    ### Časové události
    Události řízene časem můžeme ovládat pomocí příkazů `setInterval` a `setTimeout`. 
    
    #### setInterval
    `setInterval(()=>{...}, TIME)` nám umožní opakovaně spouštět kód každých `TIME` milisekund. Ukázkový kód bude každou vteřinu vypisovat zprávu do konzole. Všimněme si, že čas se udává v milisekundách, takže 1000 ms je 1 sekunda.
    ```ts
    setInterval(() => {
        console.log("Interval");
    }, 1000);
    ```

    ??? "clearTimeout"
        Interval běží, dokud ho neukončíme pomocí příkazu `clearInterval(INTERVAL_ID)`. `INTERVAL_ID` si musíe uložit při vytváření intervalu, protože nám ho vrátí `setInterval()`.
        ```ts
        const intervalId = setInterval(() => {
            console.log("Interval");
        }, 1000);
        await sleep(10000);
        clearInterval(intervalId);
        ```

    #### setTimeout
    `setTimeout(()=>{...}, TIME)` nám umožní spustit kód po uplynutí určitého času. Ukázkový kód bude po 5 sekundách vypisovat zprávu do konzole.
    ```ts
    setTimeout(() => {
        console.log("Timeout");
    }, 5000);
    ```

    ??? "clearTimeout"
        `setTimeout` běží jen jednou, po uplynutí zadaného času. Pokud ho chceme zastavit, můžeme použít příkaz `clearTimeout(TIMEOUT_ID)`. `TIMEOUT_ID` si musíme uložit při vytváření časovače, protože nám ho vrátí `setTimeout()`.
        ```ts
        const timeoutId = setTimeout(() => {
            console.log("Timeout");
        }, 5000);
        clearTimeout(timeoutId);
        ```

    ## Zadání C

    Desetkrát za sekundu vypíšeme stav zmáčknutí tlačítka (Zmackuto: false/true). Stav daného tlačítka získáme pomocí příkazu `button.isPressed()`  Opakování dosáhneme pomocí `setInterval`.

    ??? tip "Řešení"

        ```ts
        import { Button } from "button";

        const button = new Button(0);

        setInterval(() => {
            console.log(button.isPressed());
        }, 1000);
        ```

    ## Výstupní úkol V1 - Pozdrav

    Při stisknutí (pin `0`) vypíšeme pozdrav.

    ## Výstupní úkol V2 - Změna barvy

    Při stisknutí tlačítka (pin `0`) rozsvítíme LED (pin `48`) jednou barvou a při puštění barvu jinou barvou.
