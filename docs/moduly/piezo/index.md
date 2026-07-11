# Piezo
### Example project

=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Create project]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/piezo/piezo-example.tar.gz){.md-button .md-button--primary}
=== "VSCode extension"
    Otevřeme VSCode, v levém exploreru klikneme na extension `Jaculus` a tlačítko `Create Project`. Vybereme adresář, kde chceme mít projekt uložený, a zadáme název projektu. Poté v menu vybereme možnost `Custom package URL` a zadáme toto URL:

    `https://2026.robotickytabor.cz/moduly/piezo/piezo-example.tar.gz`.
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.

    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/piezo/piezo-example.tar.gz <PROJECT_NAME>
    ```
=== "Zip"
    Stáhneme si tento zip soubor, rozbalíme jej a otevřeme ve VSCode.

    [Zip soubor](https://2026.robotickytabor.cz/moduly/piezo/piezo-example.zip){.md-button .md-button--primary}

### Montáž
Pokud nemáte sestavené piezo, můžete si jej sestavit podle [návodu](https://pmod.robotikabrno.cz/PIEZO/manual/).

### Knihovna
Piezo umožňuje vyluzování orgům nelibých zvuků. Konkrétní piezo, které používáme, nemá interní oscilátor, což způsobuje, že neosciluje na výrobcem dané frekvenci, ale můžeme si s ním generovat jakoukoliv frekvenci*.

??? note
    Frekvence je omezena možnostmi generátoru na ESP, což je až 5 MHz, takže dost pro slyšitelné spektrum 20 Hz–20 kHz.

Abychom nemuseli generovat signál pro piezo sami pomocí knihovny `pwm`, můžeme použít knihovnu `piezo`. Knihovna nám usnadní každodenní úkoly, jako je přehrávání jednoduchých not, tónů a dokonce i skladeb. Dále je v knihovně připraveno pár základních zvukových efektů pro naše úžasné herní výtvory.

Piezo je připojeno k PMODu, jeho piny tedy odpovídají pinům PMODu. Můžete si je buď vyčíst z popisků na Saturnu, nebo z objektu `SaturnPins` z knihovny `saturn`, například `SaturnPins.Pmod1.Pin1`.

Pro všechny příklady je potřeba nainstalovat knihovnu `piezo`.

### Stupnice

V tomto příkladu použijeme vestavěnou metodu `playScale()` a zároveň si ukážeme, jak inicializovat piezo.

```ts
import { SaturnPins } from "saturn";
import { PIEZO } from "piezo";

const piezo = new PIEZO(SaturnPins.Pmod1.Pin1);
console.log("Piezo vytvořeno!");

await piezo.playScale();
console.log("Právě jsme mohli slyšet nádhernou notovou stupnici!");
```

### Efekty

Demonstrace přehrání efektu z vestavěné knihovny efektů.

```ts
import { SaturnPins } from "saturn";
import { PIEZO, Effects } from "piezo"; // všimněte si, že potřebujeme přidat do projektu nejen piezo, ale i efekty

const piezo = new PIEZO(SaturnPins.Pmod1.Pin1);
console.log("Piezo vytvořeno!");

await piezo.playSong(Effects.win);
console.log("Právě jsme mohli slyšet zvukový efekt vítězství!");
```

V knihovně efektů jsou tyto efekty:

- `coin`
- `jump`
- `win`
- `lose`
- `damage`
- `upgrade`
- `shoot`
- `menuMove`
- `menuSelect`
- `error`
- `notify`
- `tick`
- `tock`

### Noty

Nota se skládá z frekvence a délky.

```ts
import { SaturnPins } from "saturn";
import { PIEZO, Tones, Note } from "piezo"; // pro tento příklad potřebujeme přidat Tones, Note

const piezo = new PIEZO(SaturnPins.Pmod1.Pin1);
console.log("Piezo vytvořeno!");

let note: Note = [Tones.A, 1000] // můžeme využít Tones.<nota> // 1000 je délka v milisekundách
await piezo.playNote(note);
console.log("Právě jsme mohli slyšet tón A");

note = [440, 1000] // nebo můžeme použít přímo frekvenci
await piezo.playNote(note);
console.log("Právě jsme mohli slyšet taky tón A");
```

### Skladby

Ukážeme si, jak zreplikovat vítězný sound efekt z knihovny efektů, abychom pochopili, jak funguje vytváření skladeb.

```ts
import { SaturnPins } from "saturn";
import { PIEZO, Song, Tones} from "piezo"; // přidáme Song a Tones

const piezo = new PIEZO(SaturnPins.Pmod1.Pin1);
console.log("Piezo vytvořeno!");

let ourWin: Song = [  // skladba je jenom pole not
    [Tones.C, 100],   // můžeme využít jak Tones.<note>
    [Tones.E, 100],
    [Tones.G, 100],
    [523, 100],       // nebo můžeme využít frekvenci v Hz
    [Tones.G, 100],
    [Tones.C, 100],
]

await piezo.playSong(ourWin);
console.log("To byla výhra!");
```


### Tóny

Ukážeme si, jak vyluzovat tóny.

??? danger
    Pokud jakýkoliv org shledá, že jste se svým piezem otravní, má výsostné právo vám zabavit/zalepit piezo modul. V nejhorších případech může dojít i k permabanu z tábora. Takže buďme ohleduplní a používejme své piezo jenom pro posvěcené účely.

```ts
import { SaturnPins } from "saturn";
import { PIEZO, Tones } from "piezo";

const piezo = new PIEZO(SaturnPins.Pmod1.Pin1);
console.log("Piezo vytvořeno!");

piezo.playTone(Tones.A); // můžeme využít Tones.<nota>
console.log("Nyní hraje tón A");
await sleep(1000)
piezo.playTone(Tones.REST);

await sleep(1000)

piezo.playTone(440); // s playTone můžeme používat i frekvence v Hz
console.log("Nyní taky hraje tón A");
await sleep(1000)
piezo.playTone(Tones.REST);
```

Jak jste si mohli všimnout, `playTone()` se nezastaví po určité době, narozdíl od `playNote()`.

### Hlasitost

Asi je vám jasné, že hlasitost, kterou si momentálně pípáme, není největší. Piezo má vestavěnou metodu `setVolume()`, nebo se dá hlasitost měnit rovnou při inicializaci pieza.

```ts
import { SaturnPins } from "saturn";
import { PIEZO, Effects, Volume } from "piezo"; // nutno přidat Volume

const piezo = new PIEZO(SaturnPins.Pmod1.Pin1, Volume.LOW);
console.log("Piezo s nízkou hlasitostí vytvořeno!");

await piezo.playSong(Effects.win);
console.log("Právě jsme mohli slyšet zvukový efekt vítězství! Ale potichu. Takže PSSSS!");
```

Možné hodnoty hlasitosti jsou:

- `OFF`
- `LOW`
- `MID`
- `ON`
