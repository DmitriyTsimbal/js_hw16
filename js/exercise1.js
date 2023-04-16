// Створити клас TMoney для роботи з грошовими сумами. Сума повинна зберігатися у вигляді доларового еквівалента. Реалізувати методи додавання/вилучення грошової маси,
// вказуючи необхідну суму у гривнях, та визначення курсу долара, при якому сума у гривнях збільшиться на 100. Курс долара зберігати в окремому полі.


class TMoney {
    #dollarRate

    constructor(initDollarRate, initDollarBalance= 0) {
        this.DollarRate = initDollarRate;
        this.dollarBalance = initDollarBalance;
    }

    get DollarRate() {
        return this.#dollarRate
    }

    set DollarRate(newRate) {
        if (newRate <= 0)
            throw new Error('Dollar rate cannot be 0 or negative number');
        this.#dollarRate = newRate;
    }

    convertDollarToHryvnia(dollarValue) {
        if (dollarValue <= 0)
            throw new Error('You cannot convert zero or negative balance')
        return dollarValue * this.DollarRate;
    }

    convertHryvniaToDollar(hryvniaValue) {
        if (hryvniaValue <= 0)
            throw new Error('You cannot convert zero or negative balance')
        return hryvniaValue / this.DollarRate
    }

    addMoney(money) {
        if (money <= 0)
            throw new Error('You cannot add 0 or negative value to balance')
        this.dollarBalance += this.convertHryvniaToDollar(money)
    }
    withdrawMoney(money) {
        if (money <= 0 || money > this.convertDollarToHryvnia(this.dollarBalance))
            throw new RangeError('You cannot withdraw zero/negative value, or money that exceeds your balance')
        this.dollarBalance -= this.convertHryvniaToDollar(money)
    }
    determineDollarRate(determineEql = 100) {
        return (this.convertDollarToHryvnia(this.dollarBalance) + determineEql) / this.dollarBalance
    }
    toString() {
        return `Dollar rate: ${this.DollarRate}₴<br>Your balance: ${this.dollarBalance.toFixed(2)}$`
    }
}


let tMoney = new TMoney(40,100)

tMoney.addMoney(40)
tMoney.withdrawMoney(80)

console.log(tMoney.determineDollarRate().toFixed(2))



document.write(tMoney)