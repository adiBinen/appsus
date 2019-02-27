export default {
    generateId, 
    getRandomIntInclusive,
    formmatedDate
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formmatedDate() {
    const sentAtDate = new Date(this.email.sentAt);
    const isSameYear = (this.currentDate.getFullYear() === sentAtDate.getFullYear());
    const isSameMonth = (this.currentDate.getMonth() === sentAtDate.getMonth());
    const isSameDay = (this.currentDate.getDate() === sentAtDate.getDate());
    const isYesterday = (isSameMonth && (this.currentDate.getDate() - 1 === sentAtDate.getDate()))

    if (isSameYear) { // if same year - return full date
        return `${_ziroPadding(sentAtDate.getDate())}.
                ${_ziroPadding(sentAtDate.getMonth() + 1)}.
                ${sentAtDate.getFullYear()}`
    }
    else if (isSameMonth && isSameDay) { // if same year, month and day - return hh:mm
        return `${_ziroPadding(sentAtDate.getHours())} : 
                ${_ziroPadding(sentAtDate.getMinutes())}`
    }
    else if (isSameMonth && isYesterday) return 'Yesterday' // if yesterday - return yesterday
    return `${_ziroPadding(sentAtDate.getDate())} ${_getMonthName(sentAtDate.getMonth())} `


    function _ziroPadding(num) {
        if (num < 10) return `0${num}`;
        else return num;
    }

    function _getMonthName(monthNum) {
        let monthsName = [Jan, Feb, Mar, Apr, May, June, July, Aug, Sept, Oct, Nov, Dec];
        return monthsName[monthNum];
    }
}