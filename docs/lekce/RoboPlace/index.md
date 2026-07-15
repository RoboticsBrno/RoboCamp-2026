# RoboPlace

RoboPlace je sdílené kreslicí plátno inspirované službou r/place - jeden fyzický LED panel, na který může přes rádio kreslit libovolný počet zařízení najednou. Kdokoliv se zapojenou deskou pošle jeden pixel na společné plátno, a všichni vidí výsledek v reálném čase na displeji.

## Jak to funguje

Projekt se skládá ze dvou rolí:

- **Server** - jedno zařízení, na které je připojený HUB75 LED panel (128x128 pixelů, poskládaný ze čtyř 64x64 panelů). Server poslouchá rádiovou komunikaci, přijímá požadavky na vykreslení pixelu a průběžně posílá aktuální obsah plátna na panel.
- **Klient** - libovolné množství dalších desek, které serveru posílají, jaký pixel a jakou barvou chtějí nakreslit. Klient žádný displej nepotřebuje, stačí mu jen rádio.

Komunikace probíhá přes knihovnu `simpleradio`, která staví na ESP-NOW - deskám stačí být ve stejné rádiové skupině, nemusí být připojené k žádné Wi-Fi síti ani k sobě navzájem.

## Formát paketu

Klient posílá serveru jeden paket na jeden pixel. Paket má hlavičku a pak pevně daná data:

| bajt | obsah                                                        |
|------|---------------------------------------------------------------|
| 0    | hlavička: bit7=VERSION(1), bit6=TYPE(0=kresli pixel), bity5-0=FLAGS(0) |
| 1    | LENGTH - délka dat, která následují (vždy 5)                 |
| 2    | X (0-127)                                                     |
| 3    | Y (0-127)                                                     |
| 4    | R (0-255)                                                     |
| 5    | G (0-255)                                                     |
| 6    | B (0-255)                                                     |

Server po přijetí paketu ověří, že souřadnice X a Y jsou v rozsahu plátna, pixel zapíše do svého interního bufferu a při nejbližším překreslení ho pošle na panel.

V hlavičce si všimni, že pro `VERSION` a `TYPE` je vyhrazený jen 1 bit - dokumentovaná je ale jen jedna hodnota z každého. Co dělá server s tou druhou, tabulka neříká.

!!! tip "Pro zvídavé"
    Ukázkový klient níže sestavuje jen tenhle jeden, oficiálně zdokumentovaný typ paketu. Nic ti ale nebrání zkusit poskládat paket ručně (třeba přímo v konzoli) a podívat se, jak server zareaguje na hlavičku, kterou tenhle klient nikdy nepoužije.

## Changelog

Protokol se v minulosti měnil. Zdrojový kód ukázkového klienta níže si o tom nechává poznámku - changelog poslední verze:

**Verze 2**

- Opravena kontrola hranic souřadnic - souřadnice mimo rozsah se nově hlásí, místo aby se potichu zahodily.
- Odstraněn nezdokumentovaný ladicí/řídicí kanál.
- Opravena chyba v opětovném použití bufferu tohoto kanálu, kvůli které mohla data zaslaná dřívějším požadavkem uniknout, pokud deklarovaná délka neodpovídala skutečně odeslané.
- Zpřísněna kontrola integrity zápisů do vyhrazeného sloupce - dříve se spoléhala jen na jednoduchý, uhodnutelný kontrolní součet místo skutečné autentizace.

## Ukázkový klient

Následující program je samostatný klient - stačí ho nahrát na desku a po spuštění nakreslí jeden pixel na sdílené plátno. Souřadnice a barvu si můžeš na začátku souboru libovolně upravit.

```ts
import { begin, sendBlob, on } from 'simpleradio';

/*
 * Nakresli pixel na sdílený displej!
 *
 * Toto je samostatný soubor - nic dalšího z projektu nepotřebuješ, stačí
 * ho nahrát do své desky.
 *
 * Uprav X, Y a barvu níže a nahraj to do své desky.
 *   X a Y: 0-127 (pozice na plátně 128x128)
 *   R, G, B: 0-255 (kolik červené/zelené/modré)
 *
 * Kdykoliv budeš chtít kreslit znovu, změň hodnoty a nahraj to znovu.
 */

const X = 64;
const Y = 64;
const R = 255;
const G = 0;
const B = 255;

// --- od tohoto místa dolů už nic upravovat nemusíš ---

/*
 * Struktura paketu (DRAW, jediný zdokumentovaný typ):
 *
 * | bajt | obsah                                                       |
 * |------|--------------------------------------------------------------|
 * | 0    | hlavička: bit7=VERSION(1) bit6=TYPE(0=DRAW) bity5-0=FLAGS(0) |
 * | 1    | LENGTH - délka dat, která následují (5)                     |
 * | 2    | X (0-127)                                                   |
 * | 3    | Y (0-127)                                                   |
 * | 4    | R (0-255)                                                   |
 * | 5    | G (0-255)                                                   |
 * | 6    | B (0-255)                                                   |
 */

// Seznam změn verze 2:
// - opravena kontrola hranic souřadnic - souřadnice mimo rozsah se nyní
//   hlásí místo tichého zahození
// - odstraněn nezdokumentovaný ladicí/řídicí kanál
// - opravena chyba v opětovném použití bufferu tohoto kanálu, která mohla
//   prozradit zbytková data, pokud deklarovaná délka neodpovídala skutečně
//   odeslané
// - zpřísněna kontrola integrity zápisů do vyhrazeného sloupce, která se
//   dříve spoléhala na jednoduchý, uhodnutelný kontrolní součet místo
//   skutečné autentizace

const RADIO_GROUP = 42;
const VERSION_CURRENT = 1;
const TYPE_DRAW = 0b00;
const DRAW_PACKET_BYTES = 7; // hlavička + length + x,y,r,g,b

function packHeader(version: number, type: number, flags: number): number {
    return ((version & 0x1) << 7) | ((type & 0x1) << 6) | (flags & 0x3f);
}

function assertByte(name: string, value: number): void {
    if (!Number.isInteger(value) || value < 0 || value > 255) {
        throw new Error(`${name} musí být celé číslo v rozsahu 0-255, nikoliv ${value}`);
    }
}

function encodeDrawPacket(x: number, y: number, r: number, g: number, b: number): Uint8Array {
    assertByte("r", r);
    assertByte("g", g);
    assertByte("b", b);

    const packet = new Uint8Array(DRAW_PACKET_BYTES);
    packet[0] = packHeader(VERSION_CURRENT, TYPE_DRAW, 0);
    packet[1] = 5;
    packet[2] = x;
    packet[3] = y;
    packet[4] = r;
    packet[5] = g;
    packet[6] = b;
    return packet;
}

function drawOnCanvas(x: number, y: number, r: number, g: number, b: number) {
    sendBlob(encodeDrawPacket(x, y, r, g, b));
}

const REPLY_WAIT_MS = 1000;

export async function placePlayer() {
    begin(RADIO_GROUP);
    on("string", (str) => console.log(`Server: ${str}`));

    drawOnCanvas(10, 10, 167, 54, 230);

    const hex = (n: number) => n.toString(16).padStart(2, '0');
    console.log(`Nakresleno (${X}, ${Y}) barvou #${hex(R)}${hex(G)}${hex(B)}`);

    await sleep(REPLY_WAIT_MS);
}
```

## Vyzkoušej si

1. Nahraj si ukázkový klient na svou desku beze změn a zkontroluj, že se na sdíleném plátně objeví tvůj pixel.
2. Zkus si upravit `X`, `Y`, `R`, `G` a `B` na začátku souboru a nahrát program znovu - vyzkoušej, kam všude na plátně dokážeš kreslit.
3. Domluv se s kamarádem vedle sebe a zkuste kreslit na plátno současně ze dvou desek - uvidíte, jak se oba pixely objeví na stejném displeji.
