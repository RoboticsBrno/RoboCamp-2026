# Lekce 2.1 - Exkurze do GPIO a Button knihovny
Toto je nepovinná lekce vysvětlující fungování GPIO a Button knihovny. Nebudou prováděny žádné vedené lekce ani úkoly, lekce je zamýšlena pouze jako doplňující materiál pro ty, kteří se chtějí dozvědět více o fungování tlačítek a GPIO.

### Co je to GPIO?
GPIO (General Purpose Input Output) je způsob, jak pracovat s piny, posílat a přijímat signály. Používá se například při ovládání a čtení z periferií, například z PMODu. Naše PMOD moduly GPIO využívají. Tlačítka GPIO používají také, ale mají unikátní problémy, které ostatní periferie 

.  Při většině ostatních použití nás ale problémy s `bounce` a `debounce` nemusí trápit.

Toto je mimo jiné „low level" způsob, jak získávat input z tlačítek.

Příklad s naším vestavěným BOOT tlačítkem na Saturnu (`SaturnPins.BootBtn`):

```ts
import * as gpio from "gpio";
import { SaturnPins } from "saturn";

// nastaví pin 0 jako vstup
gpio.pinMode(SaturnPins.BootBtn, gpio.PinMode.INPUT);

// událost, která proběhne při stisknutí tlačítka
gpio.on("falling", SaturnPins.BootBtn, () => { 
    console.log("falling")
});

// událost, která proběhne při puštění tlačítka
gpio.on("rising", SaturnPins.BootBtn, () => { 
    console.log("rising")
});

// jednou za 100ms přečteme a vypíšeme hodnotu pinu (hodnota je digitální, tedy je buď 1, nebo 0)
setInterval(()=>{
    console.log(gpio.read(SaturnPins.BootBtn)); 
}, 100);
```

Jak jste si mohli všimnout, s knihovnou gpio se pracuje docela podobně jako s knihovnou button. Knihovna button je totiž postavená na GPIO, ale má několik vylepšení, které se hodí při práci s tlačítky.

Pokud už máte modul D-pad, můžeme si demonstrovat proč.

### Tlačítka, bounce a debounce
Vyzkoušíme si stejný příklad, ale s tlačítkem z D-padu. Změníme tedy nastavení z `SaturnPins.BootBtn` na PMOD pin, na kterém je připojený DPad. Může to být například `SaturnPins.Pmod1.Pin1`.

Pokud vše proběhlo správně, měli byste v konzoli vidět „falling" a „rising" vícekrát pro jedno stisknutí tlačítka. Tomuto jevu se říká `bounce` (zákmit). 

`Bounce` je způsoben konstrukcí tlačítka. Je totiž založeno na kovové pružině, která se při stisknutí tlačítka několikrát odrazí. Tím tlačítko několikrát sepne a rozepne obvod, což způsobí, že se v konzoli objeví více „falling" a „rising" událostí. Míra `bounce` je závislá na konstrukci tlačítka a jeho stáří. Tlačítko `boot` má konstrukci, která bounce minimalizuje, takže se nám v konzoli typicky objeví jen jedna „falling" a „rising" událost. Tlačítko z D-padu je k `bounce` mnohem náchylnější, takže se bez `debounce` neobejdeme.

Knihovna button má už vestavěný `debounce` a události `click` a `doubleClick`, proto ji používáme místo čistého `GPIO`.


