# Pokročilý programátorský rychlokurz

!!! info "Cíl lekce"

    Cílem této lekce není naučit se všechny detaily jazyka TypeScript, ale získat přehled o základních programátorských konceptech. 

---

V této lekci si zběžně představíme tři důležité koncepty, které se hodí při programování:

- pole
- asynchronní funkce
- základy objektů

## Pole

Jedna proměnná je užitečná, ale někdy potřebujeme uložit více hodnot. V takovém případě se hodí pole.

Pole je seznam nějakých hodnot. Každá hodnota má svůj index, začíná se od nuly. Příkladem může být pole teplot, které jsme naměřili během dne.

```ts
let temperatures = [21, 22, 23, 24];

console.log(temperatures[0]); // 21
console.log(temperatures[2]); // 23
```

Do pole můžeme přidávat další hodnoty a zjišťovat jeho délku.

```ts
temperatures.push(25);

console.log(temperatures.length); // 5, protože jsme přidali 25
```

Když chceme projít všechny hodnoty v poli, hodí se `for` cyklus z minulé lekce.

```ts
for (let i = 0; i < temperatures.length; i++) {
    console.log("Teplota na indexu " + i + ": " + temperatures[i]);
}
```

!!! tip "Kdy se pole hodí?"

    - ukládání naměřených hodnot,
    - seznam LED barev,
    - historie posledních událostí.

## Asynchronní funkce

Program vykonává úkony postupně. Pokud bychom čekali třeba na zmáčknutí tlačítka, program by zamrzl, dokud by se tlačítko nezmáčklo. Pokud si jako příklad vezmeme sanitku, která bliká a zároveň čeká na vstup "jet dopředu", tak pokud by nebyl zmáčknutý plyn, neblikala by ani houkačka. Aby program mohl dělat více věcí najednou, používají se asynchronní funkce.

### `async`

`async` z funkce udělá asynchronní funkci. Když ji zavoláme, program může pokračovat dál.

```ts
async function prepareRobot() {
    console.log("Zapínám robota");
    console.log("Kontroluji baterii");
    console.log("Připraveno!");
}

prepareRobot();
// Program běží dál bez ohledu na to, jestli funkce prepareRobot() ještě běží.
```

### `await`

`await` použijeme uvnitř `async` funkce tam, kde se má na chvíli počkat.

```ts
async function countDown() {
    for (let i = 3; i > 0; i--) {
        console.log(i);
        await sleep(1000);
    }
    console.log("Start!");
}
```

`await` se hodí hlavně pro věci jako čekání, animace nebo čtení dat z modulu.

## Základy objektů

Objekt je hodnota, která v sobě drží několik souvisejících vlastností (hodnot) a metod (funkcí). Můžeme si ho představit jako krabičku s pojmenovanými přihrádkami.

```ts
let robot = {
    name: "Robo",
    battery: 67,
    active: true
};

console.log(robot.name);
console.log(robot.battery);
```

Vlastnosti objektu lze měnit podobně jako běžné proměnné.

```ts
robot.battery = 80;
robot.active = false;
```

Objekty se hodí, když spolu souvisí více hodnot najednou.

```ts
let point = {
    x: 12,
    y: 34
};

let ledState = {
    red: 255,
    green: 180,
    blue: 20
};
```

Pokud chceme mít jistotu, jaké vlastnosti objekt obsahuje, můžeme si jejich tvar popsat typem.

```ts
type RobotState = {
    name: string;
    battery: number;
    active: boolean;
};

let state: RobotState = {
    name: "Robo",
    battery: 100,
    active: true
};
```


Další výhodou objektů je, že můžeme do nich uložit i funkce. Ty se pak nazývají metody.

```ts
let robot = {
    name: "Robo",
    battery: 67,
    active: true,
    charge: function() {
        this.battery = 100;
        console.log("Robot je nabitý!");
    }
};
```

## Jak to spojit dohromady

V praxi se tyto tři věci často používají společně:

1. do pole si ukládáme hodnoty z čidla,
2. asynchronní funkce mezi nimi čeká,
3. samotné čidlo pak může být reprezentováno jako objekt. Bude mít vlastnosti jako `name`, `value` a metody jako `read()` nebo `calibrate()`.
