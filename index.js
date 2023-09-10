const kilometersPerHour = process.argv[2];
const minutesPerKilometer = 60 / kilometersPerHour;
const seconds = (minutesPerKilometer % 1) * 60;

function padNumber(number) {
    return number.toString().padStart(2, "0");
}

console.log(
    `${kilometersPerHour}km/h is ${padNumber(
        Math.trunc(minutesPerKilometer)
    )}:${padNumber(Math.round(seconds))}/km`
);
