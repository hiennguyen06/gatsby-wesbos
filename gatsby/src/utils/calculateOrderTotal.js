import calculatePizzaPrice from "./calculatePizzaPrice"

const calculateOrderTotal = (order, pizzas) => {
    // Loop over each item in the order
    const total = order.reduce((runningTotal, singleOrder) => {
        const pizza = pizzas.find(singlePizza => singlePizza.id === singleOrder.id);
        return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size)
    }, 0);
    return total;
    // calc the total for that pizza
    // add that total to the running total
}

export default calculateOrderTotal;