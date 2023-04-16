// Створити клас TDate для роботи із датами у форматі “день.місяць.рік”. Дата представляється структурою із трьома полями.
// Реалізувати методи збільшення/зменшення дати на певну кількість днів, місяців чи років. Введення та виведення дати реалізувати за допомогою методу toString.


class TDate {
    #day
    #month
    #year

    constructor(initDay, initMonth, initYear, minYear = 1900, maxYear = 2100) {
        this.minYear = minYear;
        this.maxYear = maxYear;
        this.Day = initDay;
        this.Month = initMonth;
        this.Year = initYear;
    }

    get Day() {
        return this.#day;
    }

    get Month() {
        return this.#month;
    }

    get Year() {
        return this.#year;
    }
    set Day(newDay) {
        if (newDay < 1 || newDay > 30)
            throw new RangeError('Day must be in range (1-30)')
        this.#day = newDay
    }
    set Month(newMonth) {
        if (newMonth < 1 || newMonth > 12)
            throw new RangeError('Month must be in range (1-12)')
        this.#month = newMonth
    }
    set Year(newYear) {
        if (newYear < this.minYear || newYear > this.maxYear)
            throw new RangeError(`Year must be in range (${this.minYear}-${this.maxYear})`)
        this.#year = newYear
    }
    set IncreaseDays(days) {
        if (days < 1)
            throw new Error('You cannot increase days by zero or negative number');
        let newDay = this.Day + days;
        while (newDay > 30) {
            newDay -= 30;
            if (this.Month === 12) {
                this.Year++;
                this.Month = 12;
            } else {
                this.Month++;
            }
        }
        this.Day = newDay;
    }

    set DecreaseDays(days) {
        if (days < 1)
            throw new Error('You cannot decrease days by zero or negative number');
        let newDay = this.Day - days;
        while (newDay < 1) {
            if (this.Month === 1) {
                this.Year--;
                this.Month = 12;
            } else {
                this.Month--;
            }
            newDay += 30;
        }
        this.Day = newDay;
    }

    set IncreaseMonths(months) {
        if (months < 1)
            throw new Error('You cannot increase months by zero or negative numbers');
        let newMonth = this.Month + months;
        while (newMonth > 12) {
            newMonth -= 12;
            this.Year++;
        }
        this.Month = newMonth;
    }

    set DecreaseMonths(months) {
        if (months < 1)
            throw new Error('You cannot decrease months by zero or negative numbers');
        let newMonth = this.Month - months;
        while (newMonth < 1) {
                this.Year--;
                newMonth += 12;
        }
        this.Month = newMonth;
    }

    set IncreaseYears(years) {
        if (this.Year + years > this.maxYear)
            throw new Error(`Year can't be greater than ${ this.maxYear }`);
        this.Year += years;
    }

    set DecreaseYears(years) {
        if (this.Year-years < this.minYear)
            throw new Error(`Year can't be lower than ${ this.minYear }`);
        this.Year -= years;
    }
    toString(){
        return `${this.Day}:${this.Month}:${this.Year}`
    }
}

let date = new TDate(10, 3, 1997)

date.DecreaseDays = 2
date.IncreaseDays = 13


date.IncreaseMonths = 3
date.DecreaseMonths = 10

date.IncreaseYears = 4
date.DecreaseYears = 15

document.write(`Date(dd:mm:yyyy): ${date}`)