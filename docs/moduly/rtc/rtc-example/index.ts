import { SaturnPins } from "saturn";
import { Button } from "button";
import { DS3231 } from "ds3231";
import { I2C1 } from "i2c";

const button = new Button(SaturnPins.BootBtn);

I2C1.setup({ sda: SaturnPins.uSupA.SDA, scl: SaturnPins.uSupA.SCL });
const rtc = new DS3231(I2C1);

setInterval(() => {
    const time = rtc.readTime();
    console.log(`Current date: ${time.year}-${time.month}-${time.date}`);
    console.log(`Current time: ${time.hours}:${time.minutes}:${time.seconds}`);
}, 1000);

button.on("click", () => {
  rtc.setTime({
    year: 2024,
    month: 6,
    date: 15,
    day: 6, 
    hours: 12,
    minutes: 0,
    seconds: 0
  })
});
