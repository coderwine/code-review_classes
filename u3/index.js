const stateTax = {
    alaska: 0,
    california: .06,
    florida: .06,
    idaho: .06,
    kansas: .065,
    mississippi: .07,
    nevada: .046,
    ohio: .0575,
    texas: .0625,
    wyoming: .04,
} // What sort of object could this be considered as?

const setTax = (state) => {
    let st = state.toLowerCase();
    if(stateTax[st] || st === 'alaska') {
        const taxPerc = stateTax[st];
        return taxPerc;
    } else {
        throw `${state} is not an option to select from. Please choose from the following: ${Object.keys(stateTax).toString()}`;
    }
} // What kind of function would this be considered?

const checkPerson = name => {
    return ((typeof name === 'string') ? name : null);
}

class Store {

    constructor(name,state,tax) {
        this.name = name;
        this.state = state;
        this.salesTax = tax;
        this.owner = `Need to set`;
        this.inventory = [];
    } // When does this get invoked?

    addToInventory(item) {
        item ? 
            this.inventory.push(item) : 
            console.log(`Please provide an item.`);
    }

    setOwner(individual) {
        this.owner = checkPerson(individual);

        // What is the need of this conditional?
        if(this.owner) {
            console.log(`${this.owner} has been set to ${this.name}`);
        } else {
            console.log(`Unable to set the owner for ${this.name}. Please input a name.`)
        }
    }

}

class Restaurant extends Store {

    static generateStore(name,state) {
        const percentage = setTax(state);
        return new Restaurant(name,state,percentage);
    }

    constructor(name,state,salesTax) {
        super(name,state,salesTax);
        this.kitchenManager;
    }

    setKitchenManager(individual) {
        this.kitchenManager = checkPerson(individual);

        if(this.kitchenManager) {
            console.log(`${this.kitchenManager} has been set to ${this.name}`);
        } else {
            console.log(`Unable to set manager. Please input name.`)
        }
    }
}

class Retail extends Store {
    static generateStore(name,state) {
        const percentage = setTax(state);
        return new Retail(name,state,percentage);
    }

    constructor(name,state,salesTax) {
        super(name,state,salesTax);
        this.floorManager;
    }
    
    setFloorManager(individual) {
        this.floorManager = checkPerson(individual);

        if(this.floorManager) {
            console.log(`${this.floorManager} has been set to ${this.name}`);
        } else {
            console.log(`Unable to set manager. Please input name.`)
        }
    }
}

class Item {
    static markup(name,expense) {
        const sellAt = expense + (expense * .5);
        return new Item(name,expense,sellAt);
    }

    constructor(name,expense,retail){
        this.name = name;
        this.expense = expense;
        this.retailCost = retail;
    }
}

// What methods do the classes Restaurant have access to?
// What methods do the classes Retail have access to?

const bunsBakery = Restaurant.generateStore('Buns Bakery', 'Wyoming');
bunsBakery.setOwner('Tom');
bunsBakery.setKitchenManager('Cathy');
let donut = Item.markup('powdered', 1); // Is the constructor for the class Item being invoked immediately here?
bunsBakery.addToInventory(donut);
console.log(bunsBakery);

console.log('**----------**')
// What error happens in creating a retail store? How can we correct it?
const shirtsHappen = Retail.generateStore('Shirts Happen', 'Texas');
shirtsHappen.setOwner("Beth");
shirtsHappen.setKitchenManager('Andy');
let striped = Item.markup('striped shirt', 2.25);
shirtsHappen.addToInventory(striped);
console.log(shirtsHappen);

/* 
! Challenge
    - See if you can create an expense and profit key to help track a stores cashflow.
    - Create a method where an item can be sold from inventory to and set those values in their respective keys.
        - consider array methods to find items and how to remove/replace/update the inventory array.
    - Test all aspects using a console log to help track your code.
*/