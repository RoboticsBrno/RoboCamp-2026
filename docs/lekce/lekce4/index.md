# Lekce 4 - Proměnné a podmínky

=== "Bločky"
    <!-- TODO blocky  -->
    V i v bločkovém programování si držíme stav pomocí **proměnných**. Proměnné jsou pojmenované hodnoty,
    které můžeme měnit a opakovaně používat v různých částech kódu.

    Proměnná má svůj typ, který určuje, jaké hodnoty může proměnná mít. Proměnnou vytvoříme pomocí
    rozkliknutí kategorie "Proměnné" a zmáčkneme tlačítko vytvořit proměnnou a nazveme si ji.

    Hodnoty přiřazujeme do proměnných pomocí bločku, nastavit <název proměnné> na 

    ![První proměnné s bločky](./assets/blocksFirst.png)

    S proměnnými stejně jako s čísly můžeme provádět základní operace.

    ![Počítání s proměnnými](./assets/blocksArithmetics.png)

    Abychom na základě hodnot proměnných mohli měnit chování programu, potřebujeme **podmínky**.

    V kategorii "Logika" máme bloček "pokud" nám umožňuje rozhodnout, jestli se určitý kus kódu vykoná, nebo ne.
    Používá se k tomu pravdivostní hodnoty `true` (pravda) a `false` (nepravda).

    Například, pokud máme proměnnou `podmínka` typu boolean, pak následující kód:

    ![Podmínky s bločky](./assets/blocksConditions.png)

    znamená:
    Pokud je `podmínka` pravda (`true`), proměnná `result` bude mít hodnotu 20.
    Pokud je `podmínka` nepravda (`false`), `result` zůstane 10.

    Podmínky často používáme i pro porovnávání čísel. Například:

    ![Porovnávání s bločky](./assets/blocksComparison.png)

    Všiměte si, že musíme použít speciální porovnávací bloček, který najdeme v kategorii "Logika".

    Porovnávat můžeme různými způsoby:

    - `=` zjistí, jestli jsou hodnoty stejné
    - `≠` zjistí, jestli jsou hodnoty nejsou stejné
    - `<` zjistí, jestli je první číslo menší než druhé
    - `>` zjistí, jestli je první číslo větší než druhé
    - `≤` a `≥` zjistí, jestli je menší/rovno nebo větší/rovno

    Pokud chceme, aby se podle podmínky vykonal jeden nebo druhý kus kódu, použijeme `pokud ... jinak`.
    To uděláme, tak že klikneme na nastavovací tlačítko bločku pokud a v nově otevřeném okně si za bloček pokud přidáme bloček jinak.
    
    ![pokud jinak s bločky](./assets/blocksIfElse.png)

    Takto můžeme jednoduše řídit, co má program dělat podle různých situací.

    Pokud podmínka platí, vykoná se kód `a`, pokud neplatí, vykoná se kód `b`.



    Za použití proměnných a podmínek rozsvítíme jeden pixel na displayi různými barvami.

    Barevné světlo vytváříme ze tří základních barev: červená (RED), zelená (GREEN), a modrá (BLUE).
    Tyto barvy mícháme v různých poměrech od 0 do 255, a vytváříme tak různé barvy:

    - První hodnota (r) nám dává množství červené (tedy např. hodnoty 100, 0, 0) rozsvítí LEDku červeně
    - Druhá (g) dává množství zelené
    - Třetí (b) dává množství modré

    Ve výchozím stavu je LED vypnutá (hodnoty `(0, 0, 0)`), a nejsilnější bílé světlo získáme použitím všech
    barev na maximum (hodnoty `(255, 255, 255)`).

    Druhou variantou je použití předdefinovaných barev, které jsou v souboru `colors.ts`. Nesmíme zapomenout soubor importovat `import * as colors from "colors";`. Příklad použití obou variant:

    ![demonstrace blikaní s LEDkou na display](./assets/blocksBlink.png)

    ## Zadání A

    <!-- TODO instalace knihovny rphub75 -->
    Pomocí jedné proměnné se stavem a podmínky každou sekundu buď rozsvítíme, nebo zhasneme LED na displayi.

    
    ??? note "Řešení"
        ![Řešení zadání A](./assets/blocksA.png)

    ## Zadání B

    Pomocí funkce `colors.rainbow` budeme procházet duhu. Jde o funkci (o těch si povíme trochu více později), která dostane číslo od 0 do 360,
    a na základě toho vrátí barvu na barevném spektru. V daném intervalu (např. 100 ms) budeme postupně zvyšovat číslo a nastavovat barvu LEDky na `colors.rainbow(cislo)`. Pokud naše číslo přesáhne hodnotu `360`, musíme ho
    opět nastavit na `0`.

    ??? note "Řešení"
        ![Řešení zadání B](./assets/blocksB.png)

    ## Zadání C
    <!-- TODO instalace knihovny button -->

    Tentokrát budeme reagovat na stisk tlačítka.

    Po stisku tlačítka zhasneme aktuální LEDku, a rozsvítíme tu další.
    Pokud při stisku tlačítka svítí poslední LED, zhasneme ji, a rozsvítíme opět první LED.

    ??? note "Řešení"
        ![Řešení zadání C](./assets/blocksC.png)


    ## Výstupní úkol V1 - Knightrider

    Svítící LED "běhá" s danou rychlostí od začátku do konce displaye.
    Jakmile dorazí na konec, změní směr, a posouvá se opačným směrem.

    V našem případě bude stačit, když se bude pohybovat pouze jedna LEDka.

    ![Knightrider](./assets/knight-rider.gif)

    !!! tip "Pro dobrovolníky"

        - Jezdec může při běhu měnit barvy (např. pomocí funkce `rainbow`)

        - Jezdec může zanechávat stopu: barva nezmizí hned, ale až s odstupem. Barva může "mizet" postupně: intenzita stopy se časem snižuje.

=== "TypeScript"
    <!-- TODO typescript  -->
    <!-- TODO new project creation -->
    <!-- TODO instalace knihovny rphub75 -->
    <!-- TODO instalace knihovny button -->
    V imperativním programování si držíme stav pomocí **proměnných**. Proměnné jsou pojmenované hodnoty,
    které můžeme měnit a opakovaně používat v různých částech kódu.

    Proměnná má svůj typ, který určuje, jaké hodnoty může proměnná mít. Proměnnou vytvoříme pomocí
    klíčového slova `let`.
    Každý jazyk má několik základních typů, zatím nám budou stačit dva:

    - **number**: základní číselný typ, může nabývat např. hodnot: `1`, `2`, `10`, `-5`, `0.5`
    - **boolean**: základní pravdivostní typ, který nabývá hodnot `true` a `false`

    Hodnoty přiřazujeme do proměnných pomocí operátoru `=`. Příklad použití:

    ```ts
    let first: number; // Vytvoří proměnnou se jménem first, a typem number
    first = 10; // Přiřadí do proměnné hodnotu 10
    first = 15; // Změní hodnotu proměnné na 15
    let second: number = 20; // Vytváření a přiřazení můžeme zkombinovat
    let truth: boolean = true; // Vytvoří proměnnou typu bool, která reprezentuje pravdu
    ```

    S proměnnými stejně jako s čísly můžeme provádět základní operace.

    ```ts
    let a: number = 10;
    let b: number = 5;
    let c: number = a + b; // c je 15
    let d: number = b - a; // d je -5
    ```

    Abychom na základě hodnot proměnných mohli měnit chování programu, potřebujeme **podmínky**.

    Podmínka `if` nám umožňuje rozhodnout, jestli se určitý kus kódu vykoná, nebo ne.
    Používá se k tomu pravdivostní hodnoty `true` (pravda) a `false` (nepravda).

    Například, pokud máme proměnnou `podmínka` typu boolean, pak následující kód:

    ```ts
    let result: number = 10;
    if (podmínka) {
      result = 20;
    }
    ```

    znamená:
    Pokud je `podmínka` pravda (`true`), proměnná `result` bude mít hodnotu 20.
    Pokud je `podmínka` nepravda (`false`), `result` zůstane 10.

    Podmínky často používáme i pro porovnávání čísel. Například:

    ```ts
    let first: number;
    let second: number;
    // ...
    if (first == second) {
      // tento kód se vykoná, pokud jsou obě čísla stejná
    }
    ```

    Porovnávat můžeme různými způsoby:

    - `==` zjistí, jestli jsou hodnoty stejné
    - `<` zjistí, jestli je první číslo menší než druhé
    - `>` zjistí, jestli je první číslo větší než druhé
    - `<=` a `>=` zjistí, jestli je menší/rovno nebo větší/rovno

    Pokud chceme, aby se podle podmínky vykonal jeden nebo druhý kus kódu, použijeme `if ... else`:

    ```ts
    if (podmínka) {
      // tento kód se vykoná, když je podmínka pravda
    } else {
      // tento kód se vykoná, když je podmínka nepravda
    }
    ```

    Takto můžeme jednoduše řídit, co má program dělat podle různých situací.

    Pokud podmínka platí, vykoná se kód `a`, pokud neplatí, vykoná se kód `b`.



    Za použití proměnných a podmínek rozsvítíme jeden pixel na displayi různými barvami.

    Barevné světlo vytváříme ze tří základních barev: červená (RED), zelená (GREEN), a modrá (BLUE).
    Tyto barvy mícháme v různých poměrech od 0 do 255, a vytváříme tak různé barvy:

    - První hodnota (r) nám dává množství červené (tedy např. hodnoty 100, 0, 0) rozsvítí LEDku červeně
    - Druhá (g) dává množství zelené
    - Třetí (b) dává množství modré

    Ve výchozím stavu je LED vypnutá (hodnoty `(0, 0, 0)`), a nejsilnější bílé světlo získáme použitím všech
    barev na maximum (hodnoty `(255, 255, 255)`).

    Druhou variantou je použití předdefinovaných barev, které jsou v souboru `colors.ts`. Nesmíme zapomenout soubor importovat `import * as colors from "colors";`. Příklad použití obou variant:

    ```ts
    display.setPixel(0, 0, colors.off); // Vypne LEDku pomocí předdefinované barvy
    display.setPixel(0, 0, colors.rgb(0, 0, 0)); // Vypne LEDku pomocí vlastní barvy
    display.show();

    display.setPixel(0, 0, colors.green); // Rozsvítí LEDku zeleně pomocí předdefinované barvy
    display.setPixel(0, 0, colors.rgb(0, 255, 0)); // Rozsvítí LEDku zeleně pomocí vlastní barvy
    display.show();
    ```

    <!-- TODO update new project creation -->
    Vytvoříme si nový projekt z odkazu:

    === "Odkaz"
        ```
        https://robutek.robotikabrno.cz/v2/robot/lekce4/project4.tar.gz
        ```
    === "Zip"
        [Stáhnout ZIP](./project4.zip){ .md-button .md-button--primary }


    ## Zadání A

    <!-- TODO instalace knihovny rphub75 -->
    Pomocí jedné proměnné se stavem a podmínky každou sekundu buď rozsvítíme, nebo zhasneme LED na displayi.

    ??? note "Řešení"

        ```ts
        import * as colors from "colors";
        import { Display } from "rphub75";

        let display: Display = new Display(); // Vytvoření speciální promněné display

        let on: boolean = false; // LED je vypnutá

        setInterval(() => {
          if (on) {
            // Pokud je LED zapnutá
            display.setPixel(0, 0, colors.off); // Vypneme LED
            display.show(); // Zobrazíme změny
            on = false;
          } else {
            display.setPixel(0, 0, colors.green); // Rozsvítíme LED zelenou barvou
            display.show(); // Zobrazíme změny
            on = true;
          }
        }, 1000);
        ```

    ## Zadání B

    Pomocí funkce `colors.rainbow` budeme procházet duhu. Jde o funkci (o těch si povíme trochu více později), která dostane číslo od 0 do 360,
    a na základě toho vrátí barvu na barevném spektru. V daném intervalu (např. 100 ms) budeme postupně zvyšovat číslo a nastavovat barvu LEDky na `colors.rainbow(cislo)`. Pokud naše číslo přesáhne hodnotu `360`, musíme ho
    opět nastavit na `0`.

    ??? note "Řešení"

        ```ts
        import * as colors from "colors";
        import { Display } from "rphub75";

        let display: Display = new Display(); // Vytvoření speciální promněné display

        let shade = 0; // Držíme si stav s aktuálním odstínem

        setInterval(() => {
          display.setPixel(0, 0, colors.rainbow(shade)); // Nastavíme LED na aktuální odstín
          display.show(); // Zobrazíme změny
            shade = shade + 1; // Zvedneme odstín (lze i shade += 1)
            if (shade > 360) {
              shade = 0;
            }
        }, 100);
        ```

    ## Zadání C
    <!-- TODO instalace knihovny button -->

    Tentokrát budeme reagovat na stisk tlačítka.

    Po stisku tlačítka zhasneme aktuální LEDku, a rozsvítíme tu další.
    Pokud při stisku tlačítka svítí poslední LED, zhasneme ji, a rozsvítíme opět první LED.

    ??? note "Řešení"

        ```ts
        import * as colors from "colors";
        import { Display } from "rphub75";
        import { Button } from "button";

        let display: Display = new Display(); // Vytvoření speciální promněné display

        let button: Button = new Button(0); // Vytvoření speciální promněné button s vstupem 0, což je číslo pinu BOOT tlačítka na Saturnu

        let index: number = 0;
        let color: colors.Rgb = colors.light_blue; // Vybereme si barvu
        display.setPixel(0, 0, color); // Nastavíme LED na aktuální odstín
        display.show(); // Zobrazíme změny

        button.on("click", () => {
          display.setPixel(index, 0, colors.off); // Vypneme předchozí LED
          index = index + 1; // Zvedneme index (lze i index += 1)
          if (index >= 63) {
            // Pokud jsme mimo rozsah displaye, vrátíme se na začátek
            index = 0;
          }
          display.setPixel(index, 0, color); // Nastavíme aktuální LED
          display.show(); // Zobrazíme změny
        });
        ```

    ## Výstupní úkol V1 - Knightrider

    Svítící LED "běhá" s danou rychlostí od začátku do konce displaye.
    Jakmile dorazí na konec, změní směr, a posouvá se opačným směrem.

    V našem případě bude stačit, když se bude pohybovat pouze jedna LEDka.

    ![Knightrider](./assets/knight-rider.gif)

    !!! tip "Pro dobrovolníky"

        - Jezdec může při běhu měnit barvy (např. pomocí funkce `rainbow`)

        - Jezdec může zanechávat stopu: barva nezmizí hned, ale až s odstupem. Barva může "mizet" postupně: intenzita stopy se časem snižuje.
