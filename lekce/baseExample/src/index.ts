import { SmartLed, LED_WS2812B } from "smartled";
import * as colors from "colors";
const led = new SmartLed(48, 1, LED_WS2812B);

led.set(0, colors.green);
led.show();

setInterval(() => {
  console.log("Ahojky svete");
}, 1000);