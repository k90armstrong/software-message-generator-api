const StopWatch = class StopWatch {
    constructor() {
        this.startTime = 0;
        this.endTime = 0;
        this.totalTime = 0;
    }
    start() {
        this.startTime = Date.now();
    }
    stop() {
        this.endTime = Date.now();
        this.totalTime = this.endTime - this.startTime;
    }
    getTimeFormatted() {
        let remainingMillis = this.totalTime;
        let remainder = 0;
        let timeString = '';
        let years = Math.floor(remainingMillis / (365 * 24 * 60 * 60 * 1000));
        if (years > 0) {
            remainder = remainingMillis % (365 * 24 * 60 * 60 * 1000);
            remainingMillis = remainder;
            timeString += years + ' years, ';
        }
        let days = Math.floor(remainingMillis / (24 * 60 * 60 * 1000));
        if (days > 0) {
            remainder = remainingMillis % (24 * 60 * 60 * 1000);
            remainingMillis = remainder;
            timeString += days + ' days, ';
        }
        let hours = Math.floor(remainingMillis / (60 * 60 * 1000));
        if (hours > 0) {
            remainder = remainingMillis % (60 * 60 * 1000);
            remainingMillis = remainder;
            timeString += this.pad(hours, 2) + ':';
        }
        let minutes = Math.floor(remainingMillis / (60 * 1000));
        if (minutes > 0) {
            remainder = remainingMillis % (60 * 1000);
            remainingMillis = remainder;
            timeString += this.pad(minutes, 2) + '\'';
        }
        let seconds = Math.floor(remainingMillis / 1000);
        if (seconds > 0) {
            remainder = remainingMillis % 1000;
            remainingMillis = remainder;
            timeString += this.pad(seconds, 2) + '"';
        }
        let millis = remainingMillis;
        if (millis > 0) {
            timeString += this.pad(millis, 4) + 'ms';
        }
        return timeString;
    }
    getMillis() {
        return this.totalTime;
    }
    getSecs() {
        return this.totalTime / 1000;
    }
    getMins() {
        return this.totalTime / 1000 / 60;
    }
    pad(num, size) {
        var s = num + '';
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    }
};

module.exports = StopWatch;

