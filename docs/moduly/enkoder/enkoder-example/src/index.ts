import { RotaryEncoder } from "r-encoder";
import { Button } from "button";
import { SaturnPins } from "saturn";

const encoder = new RotaryEncoder(SaturnPins.Pmod1.Pin1, SaturnPins.Pmod1.Pin2);
const encoderBtn = new Button(SaturnPins.Pmod1.Pin3);

setInterval(() => {
    console.log("pos: " + encoder.read());
}, 5);

encoderBtn.on("click", () => {
    console.log("Clearing encoder value");
    encoder.clear();
});