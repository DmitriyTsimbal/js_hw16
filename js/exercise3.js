//Створити клас TBankomat, який моделює роботу банкомата. Клас повинен містити поля для зберігання кількості купюр кожного із номіналів від 5 до 200 гривень.
// Реалізувати методи знаходження максимальної та мінімальної сум, які може видати банкомат, та метод зняття деякої суми.


class Banknote {
    #denomination
    #quantity
    static authorizedBanknotes = [5, 10, 20, 50, 100, 200]

    constructor(initDenomination, initQuantity) {
        if (!(Banknote.authorizedBanknotes.includes(initDenomination)))
            throw new Error(`Banknote '${ initDenomination }' doesnt exist`)
        this.#denomination = initDenomination;
        this.Quantity = initQuantity

    }

    get Denomination() {
        return this.#denomination
    }

    get Quantity() {
        return this.#quantity
    }

    set Quantity(newQuantity) {
        if (newQuantity < 0)
            throw new Error('Quantity cannot be negative')
        this.#quantity = newQuantity
    }

    toString() {
        return `Banknote: ${ this.Denomination }₴, quantity: ${ this.Quantity }<br>`
    }
}

class TBankomat {
    #banknoteList

    constructor(banknoteList) {
        this.#banknoteList = banknoteList;
    }

    get BanknoteList() {
        return this.#banknoteList
    }


    getMinWithdrawAmount() {
        let min = Infinity
        for (let banknote of this.#banknoteList) {
            if (banknote.Quantity !== 0 && banknote.Denomination < min)
                min = banknote.Denomination
        }
        return min
    }

    getMaxWithdrawAmount() {
        let sum = 0;
        for (let banknote of this.#banknoteList) {
            sum += banknote.Denomination * banknote.Quantity
        }
        return sum
    }

    withdrawingSomeMoney(userInsert) {
        if (userInsert > this.getMaxWithdrawAmount())
            throw new Error('There is no so much money in the ATM')
        if (userInsert % this.getMinWithdrawAmount() !== 0 || userInsert < this.getMinWithdrawAmount())
            throw new Error('The value is not a multiple of the minimum available banknote')

        const banknoteDenomination = this.#banknoteList.map(banknote => banknote.Denomination);
        let withdrawnBanknotes = '';

        let remainingAmount = userInsert;
        for (let denomination of banknoteDenomination.sort((a, b) => b - a)) {
            if (denomination <= remainingAmount) {
                const numBanknotes = Math.floor(remainingAmount / denomination);
                const availableBanknotes = this.#banknoteList.find(n => n.Denomination === denomination).Quantity;
                const withdrawBanknotesForDenomination = Math.min(numBanknotes, availableBanknotes);
                remainingAmount -= withdrawBanknotesForDenomination * denomination;
                if (withdrawBanknotesForDenomination > 0){
                    withdrawnBanknotes += `Denomination:${denomination}₴, Quantity:${withdrawBanknotesForDenomination}; `;
                    const banknote = this.#banknoteList.find(n=>n.Denomination === denomination);
                    banknote.Quantity -= withdrawBanknotesForDenomination
                }
            }
        }
        if (remainingAmount > 0)
            throw new Error('Insufficient funds')
        return withdrawnBanknotes
    }

    render() {
        document.write(`Banknotes available at TBankomat:<br>${ this.#banknoteList.join(' ') }<hr>
        Min money that you can withdraw: ${ this.getMinWithdrawAmount() }₴<hr>
        Max money that you can withdraw: ${ this.getMaxWithdrawAmount() }₴<hr>
        You have withdrawn such money: ${bank.withdrawingSomeMoney(1120)}<hr>
        Banknotes available at TBankomat after withdraw:<br>${ this.#banknoteList.join(' ') }
`)
    }
}

const BANKNOTE_LIST = [
    new Banknote(5, 0),
    new Banknote(10, 57),
    new Banknote(20, 454),
    new Banknote(50, 635),
    new Banknote(100, 231),
    new Banknote(200, 474),
]

let bank = new TBankomat(BANKNOTE_LIST)
bank.render(BANKNOTE_LIST)


