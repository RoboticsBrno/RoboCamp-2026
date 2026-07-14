import { Button } from "button";
import { SaturnPins } from "saturn"

const btnFront = new Button(SaturnPins.Pmod3.Pin1);
const btnBack = new Button(SaturnPins.Pmod3.Pin2);
const btnLeft = new Button(SaturnPins.Pmod3.Pin3);
const btnRight = new Button(SaturnPins.Pmod3.Pin4);
const btnMiddle = new Button(SaturnPins.Pmod3.Pin5);

btnFront.on("click", () => {
    console.log("Front!");
});
btnBack.on("click", () => {
    console.log("Back!");
});
btnLeft.on("click", () => {
    console.log("Left!");
});
btnRight.on("click", () => {
    console.log("Right!");
});
btnMiddle.on("click", () => {
    console.log("Click!");
});