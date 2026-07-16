import * as adc from "adc";
import * as utils from "utils";
import { SaturnPins, createSaturn } from "saturn";
import { Button } from "button";
import * as colors from "colors";

adc.configure(SaturnPins.Pmod1.Pin1);
adc.configure(SaturnPins.Pmod1.Pin2);

const saturn = createSaturn();
const display = saturn.display;

const btn = new Button(SaturnPins.Pmod1.Pin4);

btn.on("click", async () => {
    console.log("Button pressed!");
    display.fill(colors.red);
    display.show();
    await sleep(50);
    display.fill(colors.off);
    display.show();
});


setInterval(() => {
    let x = adc.read(SaturnPins.Pmod1.Pin1);
    let y = adc.read(SaturnPins.Pmod1.Pin2);

    let screenX = Math.round(utils.map(x, 0, 1023, 0, 63));
    let screenY = Math.round(utils.map(y, 0, 1023, 0, 63));

    console.log(`X: ${x}, Y: ${y}, ScreenX: ${screenX}, ScreenY: ${screenY}`);

    display.fill(colors.off);
    display.setPixel(screenX, screenY, colors.green);
    display.show();
}, 50);
