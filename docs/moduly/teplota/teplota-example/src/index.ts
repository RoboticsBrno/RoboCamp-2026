import { DS18B20 } from "ds18b20"
import { SaturnPins } from "saturn";

const thermo = new DS18B20(SaturnPins.Pmod1.Pin1);

setInterval(async () => {
  try {
    const temperature = await thermo.readTemperature();
    console.log(`Current temperature: ${temperature} °C`);
  } catch (error) {
    console.error("Error reading temperature:" + error);
  }
}, 1000);