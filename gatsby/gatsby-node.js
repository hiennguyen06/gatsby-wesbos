import path from 'path';
import fetch from  'isomorphic-fetch';

async function turnPizzaIntoPages({ graphql, actions }) {
    // 1. Get a template for the page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
    // 2. Query all pizzas
    const { data } = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name 
                    slug {
                        current
                    }
                }
            }
        }
    `);

    // 3. Loop over each pizza and create a page for that pizza
    data.pizzas.nodes.forEach((pizza => {
        actions.createPage({
            // what is the url for the new page
            path: `pizza/${pizza.slug.current}`,
            // the template of the page
            component: pizzaTemplate,
            // data passed to context is available in page queries as GraphQL variables
            // can be seen in the props of the component
            context: {
                slug: pizza.slug.current,
            }
        })
    }));
}

async function turnToppingsIntoPages({ graphql, actions }) {
    // get the template for the page
    const toppingTemplate = path.resolve('./src/pages/pizzas.js');
    // query all toppings
    const { data } = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                    name 
                    id
                }
            }
        }
    `);

    // create page for the topping
    data.toppings.nodes.forEach((topping) => {
        actions.createPage({
            // what is the url for the new page
            path: `topping/${topping.name}`,
            component: toppingTemplate,
            context: {
                topping: topping.name,
                // TODO regex for Topping
                toppingRegex: `/${topping.name}/i`
            }
        })
    })

    // pass topping data to Pizza.js
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
    // query all slices masters
    const { data } = await graphql(`
        query {
            slicemasters: allSanityPerson {
                totalCount
                nodes {
                    name
                    id
                    slug {
                        current
                    }
                }
            }
        }
    `);
    // TODO: turn each slicemaster into their own page
    data.slicemasters.nodes.forEach((slicemaster) => {
        actions.createPage({
            path: `slicemaster/${slicemaster.slug.current}`,
            component: path.resolve('./src/templates/Slicemaster.js'),
            context: {
                name: slicemaster.person,
                slug: slicemaster.slug.current
            }

        })
    })
    // figure out how many pages there are based on how many slicemasters there are and how many per page
    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
    const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
    console.log(`${data.slicemasters.totalCount} and ${pageCount}`)
    // loop from 1 to n and create the pages for them
    Array.from({ length: pageCount }).forEach((_, i) => {
        console.log(`creating page ${i}`);
        actions.createPage({
            path: `/slicemasters/${i + 1}`,
            component: path.resolve('./src/pages/slicemasters.js'),
            context: {
                skip: i * pageSize,
                currentPage: i + 1,
                pageSize,
            }
        })
    })
}

async function fectchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
    // Fetch beers and turn into nodes
    const res = await fetch('https://sampleapis.com/beers/api/ale');
    const beers = await res.json();
    // lopp over each beer
    beers.forEach((beer) => {
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: [],
            internal: {
                type: 'Beer',
                mediaType: 'application/json',
                contentDigest: createContentDigest(beer),
            }
        };
        actions.createNode({
            ...beer,
            ...nodeMeta
        });
    })
}

// sourcing external API into graphql
export async function sourceNodes(params) {
    // fetch a list of beers and source them into out gatsby API
    await Promise.all([
        fectchBeersAndTurnIntoNodes(params)
    ]);
}

export async function createPages(params) {
    // create pages dynamically 
        // Pizza
        await Promise.all([
            turnPizzaIntoPages(params),
            turnToppingsIntoPages(params),
            turnSlicemastersIntoPages(params)
        ])
        // Toppings
        // Slicemasters
}
