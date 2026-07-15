# Pokročilý programátorský rychlokurz

!!! info "Cíl lekce"

    Cílem této lekce není naučit se všechny detaily jazyka TypeScript, ale získat přehled o základních programátorských konceptech. 

---

V této lekci si zběžně představíme čtyři důležité koncepty, které se hodí při programování:

- Objekty
- Vlastní datové typy
- Pole
- Asynchronní funkce

## Základy objektů

Objekt je hodnota, která v sobě drží několik souvisejících vlastností (hodnot) a metod (funkcí). Můžeme si ho představit jako krabičku s pojmenovanými přihrádkami.

```ts
let robot = {
    name: "Robo",
    battery: 42,
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

Další výhodou objektů je, že můžeme do nich uložit i funkce. Ty se pak nazývají metody.

```ts
let robot = {
    name: "Robo",
    battery: 42,
    active: true,
    charge: function() {
        this.battery = 100;
        console.log("Robot je nabitý!");
    }
};
```

Metody mohou elegantně pracovat s daty objektu, protože jsou vázany přímo na daný objekt pomocí `this`. Nemusíme tedy psát funkci `chargeRobot(robot: Robot)`, které bychom robota předávali jako parametr. Místo toho můžeme napsat metodu `charge()` přímo v objektu robota a volat ji jako `robot.charge()`.

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
    - seznam rozsvícených pixelů


## Vlastní datové typy

Kromě vestavěných datových typů, jako jsou `number`, `string` nebo `boolean`, si můžeme vytvořit i vlastní typ.

K tomu slouží klíčové slovo `type`:

Můžeme si vytvořit typ, který umožňuje vybrat jednu z několika možností. Například typ `Direction` může být pouze `"up"`, `"down"`, `"left"` nebo `"right"`. Můžeme si také vytvořit typ, který popisuje objekt s několika vlastnostmi. Například typ `Robot` může obsahovat souřadnice `x` a `y` a směr, kterým robot směřuje.

```ts
type Direction = "up" | "down" | "left" | "right";

type Robot = {
  x: number;
  y: number;
  direction: Direction;
}
```

Tím jsme vytvořili nový typ `Robot`. Každá proměnná tohoto typu musí obsahovat tři položky:

- `x` – číslo (`number`)
- `y` – číslo (`number`)
- `direction` – směr (`Direction`)

Takový typ zatím žádná data neukládá. Pouze popisuje, jak mají data vypadat.

!!! info "Proč vytvářet vlastní typy?"

    Díky vlastním typům je kód přehlednější a editor dokáže upozornit na chyby, například když zapomeneme některou položku nebo použijeme špatný datový typ.

### Použití vlastního typu

Typ následně použijeme při vytváření proměnné:

```ts
let robot: Robot = {
  x: 0,
  y: 0,
  direction: "up"
};
```

Pokud bychom některou položku vynechali nebo použili jiný datový typ, TypeScript nás na chybu upozorní.

Například následující kód není správně:

```ts
let robot: Robot = {
  x: 0,
  y: 0
};
```

Protože chybí položka `direction`.

Vlastní typy nám mohou velmi pomoci při práci s funkcemi. Například funkce, která má vrátit robota, může být definována takto:

```ts
function moveRobot(robot: Robot, direction: Direction): Robot {
    if (direction === "up") {
        robot.y += 1;
    } else if (direction === "down") {
        robot.y -= 1;
    } else if (direction === "left") {
        robot.x -= 1;
    } else if (direction === "right") {
        robot.x += 1;
    }
    return robot;
}
```

Všimněme si, že nás editor upozorní, pokud bychom do funkce předali špatný typ. Nedovolí nám například předat číslo místo robota nebo směr, který není definován v typu `Direction`.

### Nepovinné položky

Položky v objektu mohou být také nepovinné. To znamená, že je nemusíme při vytváření proměnné vyplnit. Nepovinnou položku označíme otazníkem `?`:

```ts
type Robot = {
  x: number;
  y: number;
  direction?: Direction; // směr je nepovinný
}

let robot1: Robot = {
    x: 0,
    y: 0
}

let robot2: Robot = {
    x: 0,
    y: 0,
    direction: "up"
}
```

## Asynchronní funkce

Některé operace trvají delší dobu. Například čekání na stisk tlačítka, načtení dat ze senzoru nebo krátká časová prodleva. Kdyby program při těchto operacích pouze čekal, nemohl by mezitím dělat nic jiného.

Asynchronní funkce umožňují programu začít takovou operaci a pokračovat v jiné práci, zatímco na její dokončení čeká. Díky tomu může robot například současně blikat LEDkami, reagovat na tlačítka nebo ovládat motory, i když zrovna čeká na data ze senzoru.

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

`await` použijeme uvnitř `async` funkce tam, kde má program počkat na dokončení asynchronní operace. V hlavním programu mimo funkce také můžeme použít `await`.

```ts
async function countDown() {
    for (let i = 3; i > 0; i--) {
        console.log(i);
        await sleep(1000);
    }
    console.log("Start!");
}
```

`async` a `await` můžeme používat i v `setInterval`/`setTimeout`, `button.on` a podobné.

```ts
setInterval(async () => {
    console.log("Vypis 1");
    await sleep(500);
    console.log("Vypis 2");
}, 10000);
```

```ts
button.on("click", async () => {
    console.log("Kliknuto!");
    await sleep(1000);
    console.log("Po jedné sekundě");
});
```

`await` se hodí hlavně pro věci jako čekání, animace nebo čtení dat z modulu.

## Jak to spojit dohromady `

V praxi se tyto tři věci často používají společně:

1. Vytvoříme vlastní typ, který popisuje data, která chceme uchovávat.
2. Vytvoříme pole, do kterého budeme ukládat jednotlivé hodnoty.
3. Přípravíme funkce, které budou s daty pracovat

```ts
type Measurement = {
  temperature: number;
  time: string;
};

let measurements: Measurement[] = [];

function addMeasurement(measurements: Measurement[], temperature: number) {
  measurements.push({
    temperature,
    time: new Date().toLocaleTimeString(),
  });
}

async function measureTemperature(measurements: Measurement[]) {
  await sleep(1000);

  addMeasurement(measurements, 24.3); 
  addMeasurement(measurements, 24.8);
  addMeasurement(measurements, 25.1);
}

function printHighTemperatures(measeurements: Measurement[], limit: number) {
  for(let i = 0; i < measurements.length; i++) {
    if(measurements[i].temperature > limit) {
      console.log(`High temperature recorded: ${measurements[i].temperature}°C at ${measurements[i].time}`);
    }
  }
}

await measureTemperature(measurements);
printHighTemperatures(measurements, 25.0);
```