# Lekce 4.5 - Joystick a DPad


=== "Bločky"
    V této lekci se naučíme číst hodnoty z joysticku a převádět je na užitečné rozsahy pomocí knihovny `utils`.

    Joystick je zařízení, které nám umožňuje ovládat něco pohybem v ploše. Jedná se vlastně o dva potenciometry - jeden pro osu X a druhý pro osu Y. Protože potenciometry vracejí napětí, mikrokontrolér jej převede na číslo v rozsahu 0–1023.

    !!! note "Poznámka"
        V lekci 1 jsme se naučili, jak vytvořit nový projekt. Pokud nevíte, jak na to, podívejte se do lekce 1.

    ## Příprava
    Nejprve si vytvoříme nový prázdný projekt. Poté musíme doinstalovat potřebné knihovny:
    - utils
    - button
    - saturn
    - colors

    ## Snímaní pozice joysticku
    Joystick je připojen k PMODu na Saturnu. Osa X je na pinu 1, osa Y na pinu 2 a tlačítko na pinu 4.

    Hodnotu z joysticku můžeme převést na jiný rozsah pomocí funkce `map` z knihovny `utils`. Například pokud chceme pohybovat pixelém na displeji 64×64, potřebujeme rozsah 0–63.

    ## Tlačítko joysticku
    Tlačítko na joysticku je připojeno také na PMOD a pracuje s ním stejně jako jakékoli jiné tlačítko pomocí knihovny `button`.

    ## DPad
    DPad je jednoduchý modul se čtyřmi tlačítky (nahoru, dolů, vlevo, vpravo), který se používá například pro ovládání nebo navigaci. S tlačítky pracujeme pomocí stejné knihovny `button` jako u jakéhokoliv jiného tlačítka.

    ## Zadání A
    Přečti hodnoty X a Y osy joysticku a vypiš je do konzole každých 50 ms.

    ## Zadání B
    Pomocí `utils.map` převeď hodnoty joysticku na souřadnice displeje 0–63 a zobraz jediný pixel na displeji.

    ## Zadání C
    Přidej reakci na tlačítko joysticku - při stisknutí rozsvít pixel na aktuální pozici, při puštění zhasni.

    ## Výstupní úkol V1 - Sledování pozice
    Vypisuj souřadnice joysticku v konzole průběžně.

    ## Výstupní úkol V2 - Barevný joystick
    Nastav barvu v závislosti na pozici joysticku - čím více doprava, tím více červené, čím více nahoru, tím více modré.


=== "TypeScript"
    V této lekci se naučíme číst hodnoty z joysticku a převádět je na užitečné rozsahy pomocí knihovny `utils`.

    !!! note "Poznámka"
        V lekci 1 jsme se naučili, jak vytvořit nový projekt. Pokud nevíte, jak na to, podívejte se do lekce 1.

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

    Do nového projektu nainstalujeme potřebné knihovny:

    ```bash
    jac lib-install utils
    jac lib-install button
    jac lib-install saturn
    jac lib-install colors
    ```

    ## Joystick

    Joystick je připojen k PMODu na Saturnu. Osa X je na pinu `1`, osa Y na pinu `2` a tlačítko na pinu `4`.

    Pro práci s piny použijeme objekt `SaturnPins` z knihovny `saturn`:

    ```ts
    import { SaturnPins } from "saturn";
    ```

    Hodnoty os jsou dostupné pomocí knihovny `adc`:

    ```ts
    import * as adc from "adc";
    import { SaturnPins } from "saturn";

    adc.configure(SaturnPins.Pmod1.Pin1);
    adc.configure(SaturnPins.Pmod1.Pin2);

    let x = adc.read(SaturnPins.Pmod1.Pin1);
    let y = adc.read(SaturnPins.Pmod1.Pin2);
    ```

    Analogová hodnota je v rozsahu `0`–`1023`. Pomocí `utils.map` ji můžeme převést na jiný rozsah:

    ```ts
    import * as utils from "utils";

    let screenX = utils.map(x, 0, 1023, 0, 63);
    let screenY = utils.map(y, 0, 1023, 0, 63);
    ```

    Tlačítko na joysticku se používá stejně jako jakékoli jiné tlačítko:

    ```ts
    import { Button } from "button";

    const btn = new Button(SaturnPins.Pmod1.Pin4);

    btn.on("press", () => {
        console.log("Button pressed");
    });

    btn.on("release", () => {
        console.log("Button released");
    });
    ```

    ## DPad

    DPad je modul se čtyřmi tlačítky (nahoru, dolů, vlevo, vpravo). Pro práci s nimi používáme stejnou knihovnu `button` jako u tlačítka na joysticku. Například:

    ```ts
    import { Button } from "button";
    import { SaturnPins } from "saturn";

    const btnUp = new Button(SaturnPins.Pmod1.Pin1);
    const btnDown = new Button(SaturnPins.Pmod1.Pin2);
    const btnLeft = new Button(SaturnPins.Pmod1.Pin3);
    const btnRight = new Button(SaturnPins.Pmod1.Pin4);

    btnUp.on("click", () => {
        console.log("Up");
    });

    btnDown.on("click", () => {
        console.log("Down");
    });

    btnLeft.on("click", () => {
        console.log("Left");
    });

    btnRight.on("click", () => {
        console.log("Right");
    });
    ```

    ## Zadání A

    Přečti hodnoty X a Y osy joysticku a vypiš je do konzole každých 50 ms.

    ??? note "Řešení"

        ```ts
        import * as adc from "adc";
        import { SaturnPins } from "saturn";

        adc.configure(SaturnPins.Pmod1.Pin1);
        adc.configure(SaturnPins.Pmod1.Pin2);

        setInterval(() => {
            let x = adc.read(SaturnPins.Pmod1.Pin1);
            let y = adc.read(SaturnPins.Pmod1.Pin2);
            console.log("X: " + x + ", Y: " + y);
        }, 50);
        ```

    ## Zadání B

    Pomocí `utils.map` převeď hodnoty joysticku na souřadnice displeje 0–63 a zobraz jediný pixel na displeji na této souřadnici.

    ??? note "Řešení"

        ```ts
        import * as adc from "adc";
        import * as utils from "utils";
        import { SaturnPins, createSaturn } from "saturn";
        import * as colors from "colors";

        adc.configure(SaturnPins.Pmod1.Pin1);
        adc.configure(SaturnPins.Pmod1.Pin2);
        const saturn = createSaturn();

        setInterval(() => {
            let x = adc.read(SaturnPins.Pmod1.Pin1);
            let y = adc.read(SaturnPins.Pmod1.Pin2);

            let screenX = utils.map(x, 0, 1023, 0, 63);
            let screenY = utils.map(y, 0, 1023, 0, 63);

            saturn.display.fill(colors.off);
            saturn.display.setPixel(screenX, screenY, colors.green);
            saturn.display.show();
        }, 50);
        ```

    ## Zadání C

    Přidej reakci na tlačítko joysticku - při stisknutí rozsvít pixel na aktuální pozici, při puštění zhasni.

    ??? note "Řešení"

        ```ts
        import * as adc from "adc";
        import * as utils from "utils";
        import { SaturnPins, createSaturn } from "saturn";
        import { Button } from "button";
        import * as colors from "colors";

        adc.configure(SaturnPins.Pmod1.Pin1);
        adc.configure(SaturnPins.Pmod1.Pin2);

        const btn = new Button(SaturnPins.Pmod1.Pin4);

        btn.on("press", () => {
            let x = adc.read(SaturnPins.Pmod1.Pin1);
            let y = adc.read(SaturnPins.Pmod1.Pin2);

            let screenX = utils.map(x, 0, 1023, 0, 63);
            let screenY = utils.map(y, 0, 1023, 0, 63);

            saturn.display.fill(colors.off);
            saturn.display.setPixel(screenX, screenY, colors.red);
            saturn.display.show();
        });

        btn.on("release", () => {
            saturn.display.fill(colors.off);
            saturn.display.show();
        });
        ```

    ## Výstupní úkol V1 - Sledování pozice

    Vypisuj souřadnice joysticku v konzole průběžně.

    ## Výstupní úkol V2 - Barevný joystick

    Nastav barvu v závislosti na pozici joysticku - čím více doprava, tím více červené, čím více nahoru, tím více modré.
