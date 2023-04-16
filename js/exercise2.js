//Задача 3. Об’єкт “Фірма” (використати члени-класи)
//поля:
// назва фірми;
// дата заснування (рік, місяць);
// послуги (назва послуги, вартість, термін виконання);
// адреси філіалів (країна, місто, вулиця, номер будинку);
//методи:
// визначення кількості років існування фірми;
// виведення всіх філіалів фірми у вказаному місті;
// виведення на екран послуг, що можуть бути виконані за вказану суму грошей та вказаний термін часу;


class EstablishmentDate {
    #year
    #month

    constructor({initMonth, initYear}) {
        this.#month = initMonth;
        this.#year = initYear;
    }

    get Year() {
        return this.#year
    }

    get Month() {
        return this.#month
    }
}

class Services {
    constructor({serviceName, cost, termsExecution}) {
        this.serviceName = serviceName;
        this.cost = cost;
        this.termsExecution = termsExecution;
    }

    toString() {
        return `Service name: ${ this.serviceName }, cost: ${ this.cost }, termsExecution: ${ this.termsExecution }`
    }
}

class BranchesAddresses {
    constructor({country, city, street, houseNumber}) {
        this.country = country;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
    }

    toString() {
        return `Full address: ${ this.country }, ${ this.city }, ${ this.street }, ${ this.houseNumber }<br>`
    }
}

class Firm {
    constructor(firmData, services, branches) {
        this.firmName = firmData.firmName;
        this.establishmentDate = new EstablishmentDate(firmData)
        this.services = services.map((param) => {
            return new Services(param)
        })
        this.branchesAddresses = branches.map((param) => {
            return new BranchesAddresses(param)
        })
    }

    getExistenceYearsOfFirm() {
        let dateNow = new Date().getFullYear();
        return dateNow - this.establishmentDate.Year
    }
    getBranchesByCityName(cityName) {
        const matchingBranches = [];
        for (let branch of this.branchesAddresses){
            if (branch.city === cityName){
                matchingBranches.push(`${branch}`)
            }
        }
        return matchingBranches.join(' ')
    }
    getServicesByPriceAndTermsExecution(price, termsExecution){
        let matchingServices = '';
        for (let service of this.services){
            if (service.cost <= price && service.termsExecution <= termsExecution)
                matchingServices += `${service.serviceName} - ${service.cost}$, Execution time: ${service.termsExecution} hours;  `
        }
        return matchingServices
    }
    toString(){
        return `The company ${this.firmName} already exists: ${this.getExistenceYearsOfFirm()} years<hr>
        Branches addresses in Kyiv: ${firm.getBranchesByCityName('Kyiv')}<hr>
        Services that match the given criteria: ${this.getServicesByPriceAndTermsExecution(10,5)}<hr>
`
    }
}

let firm = new Firm({firmName: 'That\'s What Cheese Said', initYear: 2001, initMonth: 11},
    [{
        serviceName: 'Fromage Freelancing',
        cost: 15,
        termsExecution: 5
    }, {
        serviceName: 'Cheddar Coaching',
        cost: 10,
        termsExecution: 3
    }, {
        serviceName: 'Cheesy Jokes Hotline',
        cost: 20,
        termsExecution: 7
    }, {
        serviceName: 'cheesylicious',
        cost: 5,
        termsExecution: 1
    }], [{
        country: 'Ukraine',
        city:'Kyiv',
        street: 'Borysa Hrinchenka Street',
        houseNumber:13
    },{
        country: 'Canada',
        city:'Toronto',
        street: 'Yonge Street',
        houseNumber:9
    },{
        country: 'Japan',
        city:'Kyoto',
        street: 'Kawaramachi-dori',
        houseNumber:21
    },{
        country: 'Australia',
        city:'Brisbane',
        street: 'Brunswick Street',
        houseNumber:3
    },{
        country: 'Ukraine',
        city:'Kyiv',
        street: 'Henerala Almazova Street',
        houseNumber:17
    }]
)
document.write(firm)