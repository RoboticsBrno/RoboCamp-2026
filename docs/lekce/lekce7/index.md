# Lekce 7 - Funkce

Z předchozích lekcí už umíme kreslit jednoduché tvary na displeji. Co když jich však chceme nakreslit více?

## Vytvoření projektu

=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Vytvořit projekt]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/lekce/baseExample.tar.gz){.md-button .md-button--primary}
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/lekce/baseExample.tar.gz <PROJECT_NAME>
    ```

## Instalace knihoven

Do nového projektu nainstalujeme potřebné knihovny:

- `renderer`
- `shapes`

Pokud chceme nakreslit 2 čtverce vedle sebe, můžeme zkopírovat kód a mezitím se posunout:

```ts
import { createSaturn } from "saturn";
import * as colors from "colors";

const saturn = createSaturn();
    const display = saturn.display;

display.setPixel(10, 10, colors.red);
display.setPixel(11, 10, colors.red);
display.setPixel(10, 11, colors.red);
display.setPixel(11, 11, colors.red);

display.show();

display.setPixel(20, 10, colors.blue);
display.setPixel(21, 10, colors.blue);
display.setPixel(20, 11, colors.blue);
display.setPixel(21, 11, colors.blue);

display.show();
```

To se ještě dá zvládnout, ale pokud bychom to udělali ještě párkrát, kód by se stával hůře čitelným.
Pokud bychom se pak rozhodli změnit např. velikost nakreslených čtverců, museli bychom to měnit v každé kopii tohoto kódu, což zabere čas, a je v tom jednoduché udělat chybu.

Můžeme si pomoct tím, co už známe: vnořeným `for` cyklem. Pokud chceme nakreslit např. 4 čtverce za sebou, můžeme to napsat takto:

```ts
import { createSaturn } from "saturn";
import * as colors from "colors";

const saturn = createSaturn();
    const display = saturn.display;

function drawSquare(x: number, y: number, size: number, color: number): void {
    for (let py = y; py < y + size; py++) {
        for (let px = x; px < x + size; px++) {
            display.setPixel(px, py, color);
        }
    }
    display.show();
}

for (let i: number = 0; i < 4; i++) {
    drawSquare(i * 15, 20, 10, colors.red);
}
```

Co když se však chceme pohybovat mezi čtverci různě daleko, nebo mít každý jinak velký? Odpovědí na tuto otázku jsou **funkce**.

## Funkce

Funkce je pojmenovaný kus kódu. Tento kus kódu jednou napíšeme a poté ho ze zbytku programu můžeme libovolně volat (spouštět). Celkově tak zpřehledňuje programy a dělá je rozšířitelnější.

V programu rozlišujeme mezi definicí funkce a jejím voláním. Definice vypadá následovně:

```ts
import { createSaturn } from "saturn";
import * as colors from "colors";

const saturn = createSaturn();
    const display = saturn.display;

async function drawSquare(x: number, y: number, size: number, color: number): Promise<void> {
    for (let py = y; py < y + size; py++) {
        for (let px = x; px < x + size; px++) {
            display.setPixel(px, py, color);
        }
    }
    display.show();
}
```

Definice funkce se skládá z:

- klíčového slova `function`
- jména funkce
- seznamu argumentů `(ARGUMENTS...)`
- návratového typu
- těla funkce (ve složených závorkách)

Protože v těle funkce používáme klíčové slovo `await`, je potřeba aby funkce byla označena jako `async`. Znamená to, že je tzv. asynchronní a během konání se mohou plnit další úkoly. Návratový typ asynchroních funkcí musí být obalen do `Promis<RETURN_TYPE>`, kde `RETURN_TYPE` je typ, který chceme, aby funkce vracela. Datový typ `void` říká programu, že funkce nemá nic vracet.

Klíčové slovo `await` říká programu, že má počkat na vykonání dané funkce.

K argumentům a návratovým hodnotám se dostaneme později, zatím je pro nás zajímavé jednoduše to, že jsme si nějak pojmenovali kus kódu.

Když spustíme tento kód, nic se nestane. Chybí nám totiž funkci **zavolat**. Volání funkce provedeme jejím jménem, následovaným závorkami. Pokud je funkce asynchronní a chceme čekat na její vykonání, než začneme provádět další úkol, před její volání dáme klíčové slovo `await`.

Nakreslení dvou čtverců může tedy vypadat takto:

```ts
import { createSaturn } from "saturn";
import * as colors from "colors";

const saturn = createSaturn();
    const display = saturn.display;

async function drawSquare(x: number, y: number, size: number, color: number): Promise<void> {
    for (let py = y; py < y + size; py++) {
        for (let px = x; px < x + size; px++) {
            display.setPixel(px, py, color);
        }
    }
    display.show();
}

await drawSquare(10, 20, 10, colors.red);
await drawSquare(30, 20, 15, colors.blue);
```

Program nám nakreslí 2 čtverce, a přinesli jsme si tím následující výhody:

- ze sekvence "nakresli čtverec", "pohni se", "nakresli čtverec" je na první pohled zjevné, co se bude dít, a čtenář programu nemusí analyzovat detaily toho, jak přesně kreslení každého čtverce probíhá
- když se rozhodneme, že čtverce mají mít jinou velikost, stačí udělat změnu na jednom místě

!!! warning "Pozor na `async`"
Nezapomínejte při volání funkcí obsahujících `display.show()` na `async`. Bez `await` by se změny neprojevily ve správném pořadí.

Na tak malém příkladu to možná není zjevné, ale i `display.setPixel()`, které jsme používali doteď, není nic jiného než funkce, která v sobě skrývá nějaký složitější výpočet. Funkce tedy můžeme propojovat různými způsoby, a tvořit tak programy, které toho dělají čím dál více.

Program však neřeší případ, kdy chceme aby každý čtverec měl jinou velikost. V tu chvíli nám pomůžou **argumenty**, které do funkce umíme předat. Jde o proměnné, které existují v dané funkci, a my jim při volání funkce přiřadíme konkrétní hodnotu.

```ts
import { createSaturn } from "saturn";
import * as colors from "colors";

const saturn = createSaturn();
    const display = saturn.display;

async function drawSquare(x: number, y: number, size: number, color: number): Promise<void> {
    for (let py = y; py < y + size; py++) {
        for (let px = x; px < x + size; px++) {
            display.setPixel(px, py, color);
        }
    }
    display.show();
}

await drawSquare(10, 20, 10, colors.red);
await drawSquare(30, 20, 15, colors.blue);
```

Ve funkci používáme argument `size` značící velikost čtverce, který můžeme při volání nastavit na jakoukoliv hodnotu. Program tedy vykreslí jeden čtverec o délce strany 10, popojede, a vykreslí čtverec o délce strany 15.

## Zadání A

Vytvořte funkci, která bere 2 argumenty, a nakreslí obdélník daných rozměrů. Zkuste ji zavolat s rúznými argumenty.

??? tip "Řešení"

    ```ts
    import { createSaturn } from "saturn";
    import * as colors from "colors";

    const saturn = createSaturn();
    const display = saturn.display;

    async function drawRectangle(x: number, y: number, width: number, height: number, color: number): Promise<void> {
        for (let py = y; py < y + height; py++) {
            for (let px = x; px < x + width; px++) {
                display.setPixel(px, py, color);
            }
        }
        display.show();
    }

    await drawRectangle(10, 20, 20, 10, colors.green);
    await drawRectangle(40, 20, 10, 20, colors.yellow);
    ```

## Vracení hodnot

Kromě toho, že funkce můžou brát argumenty, tak je mohou i vracet. To je užitečné v případě, že si chceme do funkce dát nějaký výpočet, a zajímá nás jeho výsledek. Hodnotu z funkce vracíme pomocí klíčového slova `return`.

Tato funkce sečte paramatry `a` a `b` a vrátí výsledek výpočtu

```ts
function add(a: number, b: number): number {
    return a + b;
}

let cisloA = 5;
let cisloB = 9;

let vysledek = add(cisloA, cisloB);

console.log(vysledek); // vypíše 14
```

Příklad použití:

Chceme-li nakreslit pravidelný n-úhelník (vzorec pro vnitřní úhly je podle [wikipedie](https://cs.wikipedia.org/wiki/Pravideln%C3%BD_mnoho%C3%BAheln%C3%ADk))

$$(1 - \frac{2}{n}) * 180$$

kde `n` je počet stran n-úhelníku.

Tento výpočet nechceme psát několikrát, je proto vhodné jej vyčlenit do funkce, která vrací napočítanou hodnotu.

```ts
function polygonAngle(sides: number): number {
    return (1 - 2 / sides) * 180;
}

console.log(`čtverec: ${polygonAngle(4)}°`);
console.log(`šestiúhelník: ${polygonAngle(6)}°`);
console.log(`dvanáctiúhelník: ${polygonAngle(12)}°`);
```

## Zadání B

Napište funkci `drawPolygon()`, která vezme 2 argumenty: počet stran a délku každé strany. Na výpočet úhlu zatočení použijte pomocnou funkci, která spočítá, jak moc je potřeba zatočit. S drobnou úpravou můžete využít funkci `polygonAngle` z předchozího příkladu.

??? tip "Řešení"

    ```ts
    import { createSaturn } from "saturn";
    import * as colors from "colors";
    import { SaturnPins } from "saturn";

    const saturn = createSaturn();
    const display = saturn.display;

    function turnAngle(sides: number): number {
        const polygonAngle = (1 - 2 / sides) * 180;
        return 180 - polygonAngle;
    }

    async function drawPolygon(sides: number, size: number): Promise<void> {
        let x = 32;
        let y = 32;
        let headingRad = 0;

        for (let side: number = 0; side < sides; side++) {
            const dx = Math.cos(headingRad);
            const dy = Math.sin(headingRad);

            for (let i: number = 1; i < size; i++) {
                display.setPixel(Math.round(x), Math.round(y), colors.white);
                x += dx;
                y += dy;
            }
            headingRad += turnAngle(sides) * Math.PI / 180;
        }
        display.show();
    }

    await drawPolygon(4, 10);
    ```

## Výstupní úkol V1

Napište program, který nakreslí jednoduchý domek (čtverec s trojúhelníkovou střechou) se stromkem (jedna linka jako kmen a kružnice jako koruna). Rozdělte kreslení mezi funkce `drawHouse()` a `drawTree()` s parametrem výška stromu.
