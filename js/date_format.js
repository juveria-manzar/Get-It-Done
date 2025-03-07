function getCurrentDate() {
    let date = new Date()

    let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ]

    let month = months[date.getMonth()]
    let day = addOrdinalIndicators(date.getDate())

    function addOrdinalIndicators(day) {
        switch (day) {
            case 1:
            case 21:
            case 31:
                day = day + "st"
                break;
            case 2:
            case 22:
                day = day + "nd"
                break;

            case 3:
            case 23:
                day = day + "rd"
                break;
            default:
                day = day + "th"
        }
        return day;
    }

    fullDate = `${month} ${day}`
    return fullDate
}

// console.log(getCurrentDate())