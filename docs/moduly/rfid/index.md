# RFID

!!! danger "Našli jsme chyby, nepoužívat!!!"

RFID čtečka umožňuje číst a zapisovat data z/na RFID tagy. Umožňuje například identifikaci objektů, přístupové systémy nebo počítání kol.

## Vytvoření projektu

=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Vytvořit projekt]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/rfid/rfid-example.tar.gz){.md-button .md-button--primary}
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/rfid/rfid-example.tar.gz <PROJECT_NAME>
    ```

## Instalace knihoven

Do nového projektu nainstalujeme potřebné knihovny:

- `rfid`

## Použití

RFID čtečka je připojená k PMODu na Saturnu. Můžete si její piny vyčíst z popisků na Saturnu, nebo z objektu `SaturnPins` z knihovny `saturn`, například `SaturnPins.Pmod1.Pin1`.

```ts
import { Rfid } from "rfid";
import { SaturnPins } from "saturn";

const rfid = new Rfid(SaturnPins.Pmod1.Pin1, SaturnPins.Pmod1.Pin2);

rfid.on("tag", (tag) => {
    console.log("Tag detected:", tag);
});
```
