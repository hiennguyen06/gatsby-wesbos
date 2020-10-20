import { FaPepperHot as icon } from 'react-icons/fa';

export default {
    // Computer name
    name: 'topping',

    // Visible Name
    title: 'Toppings',
    type: 'document',
    icon,
    fields: [
        {
            name: 'name',
            title: 'Pizza Name',
            type: 'string',
            description: 'What is the name of toppings?',
        },    
        {
            name: 'vegetarian',
            title: 'Vegetarian',
            type: 'boolean',
            options: {
                layout: 'checkbox'
            }
        },    
    ],
    preview: {
        select: {
            name: 'name',
            vegetarian: 'vegetarian',
        },
        prepare: ({name, vegetarian}) => ({
            title: `${name} ${vegetarian ? '(v)' : ''}`
        }),
    },
};