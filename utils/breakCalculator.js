export const breakCalculator = (shiftStart, shiftEnd) => {
    const parseTime = (time) => {
        const [timePart, modifier] = time.split(" ");
        let [hours, minutes] = timePart.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) {
            hours += 12;
        }
        if (modifier === "AM" && hours === 12) {
            hours = 0;
        }
        return hours * 60 + minutes;
    };

    const formatTime = (minutes) => {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        let period = hours >= 12 ? "PM" : "AM";

        if (hours > 12) hours -= 12;
        if (hours === 0) hours = 12;

        return `${hours}:${mins.toString().padStart(2, "0")} ${period}`;
    };

    const startMinutes = parseTime(shiftStart);
    const endMinutes = parseTime(shiftEnd);
    const shiftLengthMinutes = endMinutes - startMinutes;
    const shiftLengthHours = shiftLengthMinutes / 60;

    let breakTime = null;
    if (shiftLengthHours >= 4) {
        breakTime = formatTime(startMinutes + shiftLengthMinutes / 2);
    }

    return {
        shiftLengthHours,
        breakTime,
    };
};
