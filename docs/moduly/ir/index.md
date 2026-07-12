# IR

!!! danger "Našli jsme chyby, nepoužívat!!!"

IR senzor detekuje infračervené světlo. Umožňuje například detekci překážek, čáry nebo komunikaci s jinými zařízeními.

## Vytvoření projektu

=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Vytvořit projekt]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/ir/ir-example.tar.gz){.md-button .md-button--primary}
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/ir/ir-example.tar.gz <PROJECT_NAME>
    ```

## Instalace knihoven

Do nového projektu nainstalujeme potřebné knihovny:

- `ir`

## Použití

IR senzor je připojen k PMODu na Saturnu. Můžete si jeho piny vyčíst z popisků na Saturnu, nebo z objektu `SaturnPins` z knihovny `saturn`, například `SaturnPins.Pmod1.Pin1`.

```ts
import { IR } from "ir";
import { SaturnPins } from "saturn";

const ir = new IR(SaturnPins.Pmod1.Pin1);

setInterval(() => {
    console.log(ir.read());
}, 100);
```
