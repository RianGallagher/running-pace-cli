import inquirer from "inquirer";

const options = ["km/h -> min/km", "Distance and time -> min/km"];

function padNumber(number) {
    return number.toString().padStart(2, "0");
}

/**
 * Ask the user which application they want to run.
 */
async function whichConversion() {
    const answers = await inquirer.prompt({
        name: "conversion_type",
        type: "list",
        message: "Which conversion do you want to run?",
        choices: options,
    });

    return answers.conversion_type;
}

const conversionType = await whichConversion();

switch (conversionType) {
    case "km/h -> min/km":
        kmPerHourConversion();
        break;
    case "Distance and time -> min/km":
        distanceTimeConversion();
}

async function kmPerHourConversion() {
    const answers = await inquirer.prompt([
        {
            name: "kilometersPerHour",
            type: "number",
            message: "Kilometers per hour",
        },
    ]);
    const kilometersPerHour = answers.kilometersPerHour;
    const minutesPerKilometer = 60 / kilometersPerHour;
    const seconds = (minutesPerKilometer % 1) * 60;

    console.log(
        `${kilometersPerHour}km/h is ${padNumber(
            Math.trunc(minutesPerKilometer)
        )}:${padNumber(Math.round(seconds))}/km`
    );
}

async function distanceTimeConversion() {
    const answers = await inquirer.prompt([
        {
            name: "distance",
            type: "number",
            message: "Distance",
            default: 0,
        },
        {
            name: "hours",
            type: "number",
            message: "Hours",
            default: 0,
        },
        {
            name: "minutes",
            type: "number",
            message: "Minutes",
            default: 0,
        },
        {
            name: "seconds",
            type: "number",
            message: "Seconds",
            default: 0,
        },
    ]);

    const { distance, hours, minutes, seconds } = answers;
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    const minutesPerKilometer = totalMinutes / distance;
    const leftoverSeconds = (minutesPerKilometer % 1) * 60;

    console.log(
        `${distance}km in ${padNumber(hours)}:${padNumber(minutes)}:${padNumber(
            seconds
        )} is ${Math.floor(minutesPerKilometer)}:${padNumber(
            Math.floor(leftoverSeconds)
        )}/km`
    );
}
