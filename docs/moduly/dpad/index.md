# DPad

Něco o tom napiš :)

=== "Odkaz"
    Stačí kliknout na odkaz, otevře se nám VSCode a nabídne se nám možnost vytvořit projekt z připraveného balíčku.

    [Create project]( vscode://cubicap.jaculus/import?uri=https://2026.robotickytabor.cz/moduly/dpad/dpad-example.tar.gz){.md-button .md-button--primary}
=== "VSCode extension"
    Otevřeme VSCode, v levém exploreru kliknema na extension `Jaculus` a tlačítko `Create Project`. Vybereme adresář, kde chceme mít projekt uložený a zadáme název projektu. Poté v menu vybereme možnost `Custom package URL` a zadáme toto URL: 
    
    `https://2026.robotickytabor.cz/moduly/dpad/dpad-example.tar.gz`.
=== "Command line"
    Tento příkaz stačí zadat do terminálu v adresáři, kde chceme mít projekt uložený. Změníme `<PROJECT_NAME>` na název projektu, který chceme vytvořit.
    
    ```bash
    jac project-create --package https://2026.robotickytabor.cz/moduly/dpad/dpad-example.tar.gz <PROJECT_NAME>
    ```
=== "Zip"
    Stáhneme si tento zip soubor, rozbalíme jej a otevřeme ve VSCode.
    
    [Zip soubor](https://2026.robotickytabor.cz/moduly/dpad/dpad-example.zip){.md-button .md-button--primary}
