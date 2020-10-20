const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => {
    return `<div>
        <h2>Your recent Order for ${total}</h2>
        <p>Please start walking over, we will have your order ready in the next 20 mins</p>
        <ul>
            ${order.map(item => `<li>
                <img src="${item.thumbnail}" alt="${item.name}" />
                ${item.size} ${item.name} - ${item.price}
            </li>`).join('')}
        </ul>
        <p>Your total is <strong>$${total}</strong> due at pickup</p>
        <style>
            ul {
                list-style: none;
            }
        </style>
    </div>`
}

// create a transport for node mailer)
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

const wait = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

// test send an email

exports.handler = async (event, context) => {
    // await wait(5000);
    const body = JSON.parse(event.body)
    // check if they have filled out the honey pot
    if(body.mapleSyrup) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'goodbye' })
        }
    }
    // Validate the data coming is correct
    const requiredFields = ['email', 'name', 'order'];
    for(const field of requiredFields) {
        console.log(`checking that ${field} is good`)
        if(!body[field]) {
            return {
                statusCode: 400,
                body: JSON.stringify({message: `Oops! You are missing the ${field} field`})
            }
        }
    }

    // Msake sure they actaully have items in that order
    if(!body.order.length) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: `Why would you order nothing`})
        };
    }

    // send the email
    const info = await transporter.sendMail({
        from: 'Slicks Slices <slick@example.com>',
        to: `${body.name} <${body.email}>, orders@example.com`,
        subject: "New Order",
        html: generateOrderEmail({ order: body.order, total: body.total })
    });
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success'}),
    }
}