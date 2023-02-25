const { DateTime } = require('luxon');

function isProductFinished(startDate, startTime) {
    const dt = DateTime.now();
    const now = dt.setZone("America/Argentina/Buenos_Aires");

    let endEventDate = DateTime.fromISO(`${startDate}T${startTime}`, { zone: "America/Argentina/Buenos_Aires" });
    endEventDate = endEventDate.plus({ hours: 3 });

    return now > endEventDate;
}

module.exports = isProductFinished;
