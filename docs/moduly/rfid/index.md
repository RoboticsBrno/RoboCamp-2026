# RFID

RFID čtečka umožňuje číst a zapisovat data z/na RFID tagy. Umožňuje například identifikaci objektů, přístupové systémy nebo počítání kol.

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

- `rc522` 

Jde o knihovnu, která umožňuje komunikaci s RFID čtečkou. Nainstalujeme ji buď přes VSCode, nebo přes příkazovou řádku:

```bash
jac lib-install rc522
```

## Použití

RFID čtečka je připojená k PMODu na Saturnu. Můžete si její piny vyčíst z popisků na Saturnu, nebo z objektu `SaturnPins` z knihovny `saturn`, například `SaturnPins.Pmod1.Pin1`. Detekce tagu karty jde za pomocí kódu:

```ts
// Import potřebných modulů pro hardwarovou komunikaci a práci s RFID čtečkou
import { SPI2 } from "spi";
import { SaturnPins } from "saturn";
import { RC522, MifareClassic, DEFAULT_KEY, formatUID } from "rc522";

// Konfigurace sběrnice SPI pro komunikaci se čtečkou RC522
SPI2.setup({
    sck: SaturnPins.Pmod1.Pin1,    // SCK (Serial Clock) - hodinový signál
    mosi: SaturnPins.Pmod1.Pin3,   // MOSI (Master Out Slave In) - odesílání dat do čtečky
    miso: SaturnPins.Pmod1.Pin2,   // MISO (Master In Slave Out) - příjem dat ze čtečky
    baud: 1000000                  // Komunikační rychlost v Hz (RC522 spolehlivě zvládá až 10 MHz)
});

// Nastavení pinu pro výběr čipu (Chip Select) a inicializace samotné čtečky
const csPin = SaturnPins.Pmod1.Pin4; 
const reader = new RC522(SPI2, csPin);

// Pravidelná kontrola přítomnosti karty každých 500 milisekund
setInterval(async () => {
    // Pokus o načtení karty přiložené ke čtečce
    const uid = await reader.readCard();
        
    // Pokud nebyla nalezena žádná karta, tiše skončíme a zkusíme to znovu za 500 ms
    if (!uid) return; 

    // Karta byla úspěšně detekována, vypíšeme její unikátní identifikátor (UID)
    console.log(`Nalezena karta s UID: ${formatUID(uid)}`);
}, 500);
```

Také lze pracovat s paměťovými bloky na RFID tagu, číst a zapisovat data. V příkladu níže je ukázáno, jak detekovat přiložený tag a vypsat jeho UID.

```ts
// Import potřebných modulů pro hardwarovou komunikaci a práci s RFID čtečkou
import { SPI2 } from "spi";
import { SaturnPins } from "saturn";
import { RC522, MifareClassic, DEFAULT_KEY, formatUID } from "rc522";

// Konfigurace sběrnice SPI pro komunikaci se čtečkou RC522
SPI2.setup({
    sck: SaturnPins.Pmod1.Pin1,    // SCK (Serial Clock) - hodinový signál
    mosi: SaturnPins.Pmod1.Pin3,   // MOSI (Master Out Slave In) - odesílání dat do čtečky
    miso: SaturnPins.Pmod1.Pin2,   // MISO (Master In Slave Out) - příjem dat ze čtečky
    baud: 1000000                  // Komunikační rychlost v Hz (RC522 spolehlivě zvládá až 10 MHz)
});

// Nastavení pinu pro výběr čipu (Chip Select) a inicializace samotné čtečky
const csPin = SaturnPins.Pmod1.Pin4; 
const reader = new RC522(SPI2, csPin);

// Vytvoření instance pro pokročilejší práci s kartami typu Mifare Classic
const mifare = new MifareClassic(reader);

// Ochranný zámek, který zabraňuje překrývání čtecích cyklů
let isScanning = false;

// Pravidelná kontrola přítomnosti karty každých 500 milisekund
setInterval(async () => {
    // Pokud předchozí čtení ještě neskončilo, tento cyklus přeskočíme
    if (isScanning) return; 
    
    isScanning = true;
    
    try {
        // Pokus o načtení karty přiložené ke čtečce
        const uid = await reader.readCard();
        
        // Pokud nebyla nalezena žádná karta, tiše skončíme a zkusíme to znovu za 500 ms
        if (!uid) return; 

        // Karta byla úspěšně detekována, vypíšeme její unikátní identifikátor (UID)
        console.log(`Nalezena karta s UID: ${formatUID(uid)}`);

        // Zvolíme blok paměti, ze kterého chceme číst (v tomto případě blok 4)
        const blockNumber = 4;
        
        // Pro přístup k datům na kartě je nutné se nejprve autentizovat výchozím klíčem (typ klíče "A")
        await mifare.authenticate(uid, blockNumber, DEFAULT_KEY, "A");
        
        // Přečtení samotných dat ze zvoleného bloku a jejich výpis
        let data = [0,33,65,104,111,106,32,116,195,161,98,111,114,33,32,0]
        await mifare.writeBlock(blockNumber, data); // Příklad zápisu dat do bloku
        console.log("Zapsaná data: " + data);
        let readedData = await mifare.readBlock(blockNumber); // Přečtení dat z bloku
        console.log("Přečtená data: " + readedData);

    } catch (error) {
        // Zachycení a výpis případných chyb (např. karta byla oddálena příliš brzy)
        console.error("Došlo k chybě při komunikaci: " + error);
    } finally {
        // Závěrečný úklid, který se provede vždy (po úspěchu i při chybě)
        // Ukončení šifrované komunikace a uspání karty
        mifare.stopCrypto();
        await reader.halt();
        
        // Uvolnění zámku pro další kontrolní cyklus
        isScanning = false;
    }
}, 500);
```
