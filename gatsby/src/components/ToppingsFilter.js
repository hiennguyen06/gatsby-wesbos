import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Link } from 'gatsby'
import styled from 'styled-components';

const ToppingStyles = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 4rem;

    a {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 0 1rem;
        align-items: center;
        padding: 5px;
        background: var(--grey);
        border-radius: 2px;

        .count {
            background: #fff;
            padding: 2px 5px;
        }

        &[aria-current='page'] {
            background: var(--yellow);
        }
    }
`;

const query = graphql`
  {
    allSanityTopping {
      nodes {
        name
        id
        vegetarian
      }
    }
    allSanityPizza {
        nodes {
            toppings {
                name
                id
            }
        }
    }
  }
`

const countPizzasInToppings = (pizzas) => {
    const counts = pizzas
        .map((pizza) => pizza.toppings)
        .flat()
        .reduce((acc, topping) => {
            // check if this is an existing topping
            const existingTopping = acc[topping.id];
            // if it is, increament by 1
            if(existingTopping) {
                existingTopping.count += 1;
            } else {
                acc[topping.id] = {
                    id: topping.id,
                    name: topping.name,
                    count: 1
                }
            }
            // otherwise create a new entry in out acc and set to one
            return acc
        }, {});
        const sortedToppings = Object.values(counts).sort((a,b) => b.count - a.count);
        return sortedToppings;
}

const ToppingsFilter = () => {
    // Get a list of all the toppings
    // Get a list of all the Pizzas with their toppings
    const data = useStaticQuery(query);
    const {
        allSanityTopping: {nodes: toppings},
        allSanityPizza: {nodes: pizzas}
    } = data

    // Count how many pizzas are in each toppings
    const toppingsWithCounts = countPizzasInToppings(pizzas)
    // Loop over the list of toppings and display the topping and the count of piizas in that topping
    // Link it up

    return (
        <ToppingStyles>
            <Link to="/pizzas">
                <span className="name">All</span>
                <span className="count">{pizzas.length}</span>
            </Link>
            {toppingsWithCounts.map((topping) => {
                return (
                    <Link key={topping.id} to={`/topping/${topping.name}`}>
                        <span className="name">{topping.name}</span>
                        <span className="count">{topping.count}</span>
                    </Link>
                )
            })}
        </ToppingStyles>
    )
}

export default ToppingsFilter