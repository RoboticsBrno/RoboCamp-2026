import { Button } from "button";
import { SaturnPins} from "saturn"

const btn = new Button(SaturnPins.Pmod1.Pin1);

btn.on("click", () => {
    console.log("Button clicked!");
});
