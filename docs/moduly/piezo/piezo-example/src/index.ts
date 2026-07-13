import { SaturnPins } from "saturn";
import { PIEZO } from "piezo";

let piezo: PIEZO = new PIEZO(SaturnPins.Pmod1.Pin1);
console.log("Piezo vytvoreno!");

await piezo.playScale();
console.log("Prave jsme mohli slyset nadhernou notovou stupnici!");
