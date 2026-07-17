import * as adc from 'adc';
import { SaturnPins } from "saturn"

adc.configure(SaturnPins.Pmod1.Pin1);

setInterval(() => {
  console.log(adc.read(SaturnPins.Pmod1.Pin1));
}, 50);