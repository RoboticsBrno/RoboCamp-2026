# Programátorský rychlokurz

!!! info "Cíl lekce"

    Cílem této lekce není naučit se všechny detaily jazyka TypeScript, ale získat přehled o základních programátorských konceptech.
---


Každý program, od blikání LED po řízení robota, je složen jen z několika základních stavebních kamenů. Jakmile pochopíte jejich princip, budete schopni číst i psát mnohem složitější programy.

V této lekci si zběžně představíme čtyři nejdůležitější koncepty:

- proměnné
- podmínky
- cykly
- funkce


## Proměnné

Proměnná slouží k ukládání dat, se kterými program pracuje. Může obsahovat například číslo, text nebo informaci typu **true/false**.

```ts
let score = 0;
let name = "Jogurt";
let ledOn = true;
```

Hodnotu proměnné lze měnit. Například:

```ts
score = 5;
score = score + 1;
ledOn = false;
```


!!! example "Příklady použití"

    Do proměnných můžeme ukládat například:

    - počet bodů ve hře,
    - teplotu ze senzoru,
    - stav tlačítka,
    - jas LED.

---

## Podmínky

Program často potřebuje reagovat na různé situace. K tomu slouží podmínky.

Pokud je podmínka splněna, vykoná se jedna část programu. Pokud ne, vykoná se jiná.

```ts
if (temperature > 30) {
    led.set(0, colors.red);
    led.show()
}
```

Podmínky lze doplnit o větev `else`.

```ts
if (button.isPressed()) {
    led.set(0, colors.red);
    led.show();
} else {
    led.set(0, colors.off);
    led.show();
}
```


## Cykly

Mnoho činností je potřeba opakovat. Místo psaní stejného kódu několikrát použijeme cyklus.

Můžeme využít dva typy cyklů: **for** a **while**.

**for** cyklus se používá, když víme, kolikrát chceme část programu opakovat.

```ts
for (let i = 0; i < 64; i++) {
    display.setPixel(i, 0, colors.red);
}
```

!!! example "Kde se **for** používají?"
    - kreslení obrázku na display
    - blikání LED několikrát za sebou
    - jízda robotka ve čtverci

**while** cyklus se používá, když nevíme, kolikrát chceme část programu opakovat. Opakuje se, dokud je splněna podmínka.

```ts
while(!button.isPressed()) {
    console.log("Not pressed");
    await sleep(100);
}
console.log("Button pressed");
```

!!! example "Kde se **while** používají?"
    - pravidelné čtení senzorů
    - hlavní smyčka programu robota

Poznávací cvičení - jaký cyklus použijeme?
    - Ohříváme vodu, dokud nebude mít 60°C
    - Procházíme seznam, u kterého víme počet záznamů
    - Chceme, aby ledka blikala na pozadí

---


## Funkce

Funkce je pojmenovaný blok kódu, který lze použít opakovaně. Díky tomu nemusíme stejný kód kopírovat na více míst. 

```ts
function drawLine(){
    for(let i = 0; i < 64; i++) {
        display.setPixel(i, 0, colors.red);
    }
}

```

Funkci spustíme jejím zavoláním.

```ts
drawLine();
```

Funkce mohou přijímat také parametry. Parametry jsou vstupní hodnoty, které funkce potřebuje k vykonání své práce.

```ts
function drawLine(color: Color, length: number){
    for(let i = 0; i < length; i++) {
        display.setPixel(i, 0, color);
    }
}

drawLine(colors.red, 64);
```

!!! note

    Velké programy jsou složené z mnoha menších funkcí. Díky tomu jsou přehlednější a jednodušší na úpravy.

---

## Jak to všechno spolupracuje?

Většina programů používá všechny tyto koncepty najednou.

Například robot může:

1. v cyklu neustále číst hodnoty senzorů,
2. ukládat je do proměnných,
3. pomocí podmínek rozhodnout, co udělá,
4. zavolat funkci, která vykoná požadovanou akci.

---

## Shrnutí

| Koncept | K čemu slouží |
|----------|---------------|
| Proměnné | Ukládání dat |
| Podmínky | Rozhodování podle situace |
| Cykly | Opakování části programu |
| Funkce | Rozdělení programu na menší znovupoužitelné části |