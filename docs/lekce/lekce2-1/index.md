# Lekce 2.1 - Co je to GPIO?

GPIO (General Purpose Input Output) je způsob, jak pracovat s piny a získávat jimi
input nebo generovat output signály.

Toto je mimo jiné „low level" způsob, jak získávat input z tlačítek.

Příklad s naším vestavěným BOOT tlačítkem na Saturnu (`IO00`):

```ts
import * as gpio from "gpio";
const button: number = 0; // nastavení, že používáme vnitřní tlačítko na pinu IO00
gpio.pinMode(button, gpio.PinMode.INPUT); // nastaví pin 0 jako vstup
gpio.on("falling", button, () => { // událost, která proběhne při stisknutí tlačítka připojeného na pin 0
    console.log("falling") // vypíšeme do konzole, abychom poznali, že událost proběhla
});
gpio.on("rising", button, () => { // událost, která proběhne při puštění tlačítka připojeného na pin 0
    console.log("rising") // vypíšeme do konzole, abychom poznali, že událost proběhla
});
setInterval(()=>{
    console.log(gpio.read(button)); // jednou za sekundu přečteme a vypíšeme hodnotu pinu (hodnota je digitální, tedy je buď 1, nebo 0)
}, 10000);
```

Jak jste si mohli všimnout, s knihovnou gpio se pracuje docela podobně jako s knihovnou button.

Není to náhoda. I přes podobnost s většinou tlačítek chceme používat knihovnu button.

Pokud už máte modul D-pad, můžeme si demonstrovat proč.

Zkuste stejný příklad jako s vnitřním tlačítkem, ale změňte nastavení z `IO00` na `IO`, na kterém máte jakékoliv tlačítko z D-padu.

Pokud vše proběhlo správně, měli byste v konzoli vidět „falling" a „rising" vícekrát pro jedno stisknutí tlačítka. Tomuto jevu se říká bounce (zákmit).

Knihovna button má už vestavěný debounce a dalších pár událostí, které bychom si jinak museli speciálně dělat, jako `click` a `doubleClick`.

GPIO je však užitečné při ovládání digitálních periferií z PMODu.

Třeba kdybychom vzali obyčejnou LEDku a zapojili pin `-` na `PMOD G` a pin `+` na `PMOD +`, tak svítí.

Ale co když ji chceme rozblikat? Zapojíme tedy pin `+` na jeden z `IO` pinů. Pak ji můžeme rozblikat následovně:

Na tento příklad budeme potřebovat knihovnu `basic`.

<!--TODO: game loop-->

```ts
import * as gpio from "gpio";
import * as basic from "basic";
const LED: number = 2; // nastavení, že máme LEDku zapojenou na pinu IO02
gpio.pinMode(LED, gpio.PinMode.OUTPUT); // nastaví pin 2 jako výstup
basic.forever(() => {
    gpio.write(LED, 1); // nastavíme, aby LEDka svítila
    await sleep(100);
    gpio.write(LED, 0); // nastavíme, aby LEDka nesvítila
    await sleep(100);
});
```
